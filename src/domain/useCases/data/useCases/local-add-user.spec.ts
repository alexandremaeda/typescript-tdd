class LocalAddUser {
  constructor(private readonly cacheStore: CacheStore) {}
}

interface CacheStore {}

class CacheStoreSpy implements CacheStore {
  deleteCallsCount = 0;
}

describe("LocalAddUser", () => {
  test("should not delete cache on sut.init", () => {
    const cacheStore = new CacheStoreSpy();
    new LocalAddUser(cacheStore);

    expect(cacheStore.deleteCallsCount).toBe(0);
  });
});
