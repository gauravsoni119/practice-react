import { BANK_UPI_HANDLES } from './constant';
export function fetchBanks(query: string): Promise<string[]> {
  return new Promise((res) => {
    setTimeout(() => {
      const bankNameRegex = new RegExp(query, 'i');
      const matchedBankNames = BANK_UPI_HANDLES.filter((bank) =>
        bankNameRegex.test(bank)
      );
      res(matchedBankNames);
    }, 500);
  });
}
