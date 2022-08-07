import { defaultAllowLogic } from './defaultAllowLogic';

describe('defaultAllowLogic', () => {
  it('must handle different same of arrays', () => {
    expect(defaultAllowLogic(['1', '2', '3'], [], ['1', '2', '3'])).toBe(true);
  });

  it('must handle different order of arrays', () => {
    expect(defaultAllowLogic(['1', '2', '3'], [], ['3', '1', '2'])).toBe(true);
  });

  it('must return true if no permissions denied', () => {
    expect(defaultAllowLogic(['1'], [], ['1'])).toBe(true);
  });

  it('must return false if any permissions denied', () => {
    expect(defaultAllowLogic(['1'], ['2'], ['1'])).toBe(false);
  });

  it('must return false if not all permissions are allowed', () => {
    expect(defaultAllowLogic(['1'], [], ['1', '2'])).toBe(false);
  });
});
