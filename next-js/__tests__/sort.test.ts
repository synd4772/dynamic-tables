import { DocumentState, HeaderName } from "../../shared/types/documents.types"
import { sortByKey } from "../src/app/utils/DataHandler";

describe('sortByKey', ()=> {
  const data = [
    {id: 1, [HeaderName.state]: DocumentState.inProgress},
    {id: 3, [HeaderName.state]: DocumentState.submitted},
    {id: 2, [HeaderName.state]: DocumentState.additionalReview},
  ];

  [
    {key: HeaderName.id, isAscending: true, expected: [1,2,3]},
    {key: HeaderName.id, isAscending: false, expected: [3,2,1]},
    {key: HeaderName.state, isAscending: true, expected: [
      DocumentState.additionalReview,
      DocumentState.inProgress,
      DocumentState.submitted,
    ]},
    {key: HeaderName.state, isAscending: false, expected: [
      DocumentState.submitted,
      DocumentState.inProgress,
      DocumentState.additionalReview,
    ]},
  ].forEach(({ key, isAscending, expected}, i) => {
    it(`${i}) should sort by ${key} in ${isAscending ? 'asc':'desc'} direction`, () => {
      const sorted = sortByKey({ data, key, isAscending});
      expect(sorted[0][key]).toBe(expected[0]);
      expect(sorted[2][key]).toBe(expected[2]);
    })
  })
})