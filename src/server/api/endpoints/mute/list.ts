import $ from 'cafy';
import { ID } from '../../../../misc/cafy-id';
import define from '../../define';
import { makePaginationQuery } from '../../common/make-pagination-query';
import { Mutings } from '../../../../models';

export const meta = {
	desc: {
		'ja-JP': 'ミュートしているユーザー一覧を取得します。',
		'en-US': 'Get muted users.'
	},

	tags: ['account'],

	requireCredential: true as const,

	kind: 'read:mutes',

	params: {
		limit: {
			validator: $.optional.num.range(1, 100),
			default: 30
		},

		sinceId: {
			validator: $.optional.type(ID),
		},

		untilId: {
			validator: $.optional.type(ID),
		},

		isRenoteOnly: {
			validator: $.optional.bool,
			default: false
		}
	},

	res: {
		type: 'array' as const,
		optional: false as const, nullable: false as const,
		items: {
			type: 'object' as const,
			optional: false as const, nullable: false as const,
			ref: 'Muting',
		}
	},
};

export default define(meta, async (ps, me) => {
	const query = makePaginationQuery(Mutings.createQueryBuilder('muting'), ps.sinceId, ps.untilId)
		.andWhere(`muting.muterId = :meId`, { meId: me.id })
		.andWhere(`muting.isRenoteOnly = :isRenoteOnly`, {isRenoteOnly: (ps.isRenoteOnly ? "TRUE" : "FALSE")});

	const mutings = await query
		.take(ps.limit!)
		.getMany();

	return await Mutings.packMany(mutings, me);
});
