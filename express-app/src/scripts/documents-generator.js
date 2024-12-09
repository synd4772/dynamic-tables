import fs from 'node:fs';
const DocumentState = {
  submitted: 'SUBMITTED',
  inProgress: 'IN_PROCESS',
  additionalReview: 'ADDITIONAL_REVIEW',
  reviewCompleted: 'REVIEW_COMPLETED',
  invalid: 'INVALID',
} 
const states = Object.values(DocumentState);
const customAmount = process.argv.length && process.argv[2]?.split('=')?.length ? process.argv[2]?.split('=')[1] : null
const RECORDS_AMOUNT = customAmount || 1_000_000;
console.log({ RECORDS_AMOUNT })
const randomState = () => states[Math.max(Math.random() * 4)];
const randomInt = (max) =>{
  const randomNumber =  Math.floor(Math.random() * max);
  return randomNumber < 1
    ? 1
    : randomNumber
};
const randomDate = () => {
  return `2024-${randomInt(12).toString().padStart(2, '0')}-${randomInt(27).toString().padStart(2, '0')}`;
}
const db = [];
for (let i = 1; i <= RECORDS_AMOUNT; i++ ) {
  db.push({
    id: i,
    state: randomState(),
    stateTime: `${randomDate()}T23:17:04.956798`,
    documentNumber: `${i}`,
    documentName: `Doc ${Math.floor(Math.random() * RECORDS_AMOUNT*RECORDS_AMOUNT).toString(16)}`,
    documentDate: `${randomDate()}`,
    documentTotalAmount: randomInt(1000000),
    eligibleAmount: null,
    version: 0,
    eligiblePercentage: null
  });
}
const TARGET_FILE_PATH = './src/assets/data/document-list.mocked-data.json';
fs.writeFileSync(TARGET_FILE_PATH, JSON.stringify(db));
console.log(`Generated ${RECORDS_AMOUNT} records, written to ${TARGET_FILE_PATH}`);
