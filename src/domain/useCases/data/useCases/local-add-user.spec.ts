class LocalAddUser {
  constructor(private readonly cacheStore: CacheStore) {}

  async save(): Promise<void> {
    this.cacheStore.delete("email@email.com");
  }
}

interface CacheStore {
  delete: (key: string) => void;
}

class CacheStoreSpy implements CacheStore {
  deleteCallsCount = 0;
  key: string;

  delete(key: string): void {
    this.deleteCallsCount++;
    this.key = key;
  }
}

// sut = system under test
type SutTypes = {
  sut: LocalAddUser;
  cacheStore: CacheStoreSpy;
};

const makeSut = (): SutTypes => {
  const cacheStore = new CacheStoreSpy();
  const sut = new LocalAddUser(cacheStore);

  return {
    cacheStore,
    sut,
  };
};

describe("LocalAddUser", () => {
  test("should not delete cache on sut.init", () => {
    const { cacheStore } = makeSut();
    new LocalAddUser(cacheStore);

    expect(cacheStore.deleteCallsCount).toBe(0);
  });

  test("should delete old cache on sut.save", async () => {
    const { cacheStore, sut } = makeSut();

    await sut.save();

    expect(cacheStore.deleteCallsCount).toBe(1);
    expect(cacheStore.key).toBe("email@email.com");
  });
});
