import { LocalLoadPurchases } from "@/data/usecases";
import { CacheStoreSpy, mockPurchases } from "@/data/tests";

type SutTypes = {
  sut: LocalLoadPurchases;
  cacheStore: CacheStoreSpy;
};

const makeSut = (timestamp = new Date()): SutTypes => {
  const cacheStore = new CacheStoreSpy();
  const sut = new LocalLoadPurchases(cacheStore, timestamp);
  return {
    sut,
    cacheStore,
  };
};

describe("LocalLoadPurchases", () => {
  it("não deve excluir ou inserir o cache no sut.init", () => {
    const { cacheStore } = makeSut();
    expect(cacheStore.actions).toEqual([]);
  });
  it("deve retornar uma lista vazia se o load falhar", async () => {
    const { cacheStore, sut } = makeSut();
    cacheStore.simulateFetchError();
    const purchases = await sut.loadAll();
    expect(cacheStore.actions).toEqual([
      CacheStoreSpy.Action.fetch,
      CacheStoreSpy.Action.delete,
    ]);
    expect(cacheStore.deleteKey).toBe("purchases");
    expect(purchases).toEqual([]);
  });
  it("deve retornar uma lista vazia se o cache for maior do quer 3 dias", async () => {
    const timestamp = new Date();
    const { cacheStore, sut } = makeSut(timestamp);
    cacheStore.fetchResult = {
      timestamp,
      value: mockPurchases(),
    };
    const purchases = await sut.loadAll();
    expect(cacheStore.actions).toEqual([CacheStoreSpy.Action.fetch]);
    expect(purchases).toEqual(cacheStore.fetchResult.value);
    expect(cacheStore.fetchKey).toBe("purchases");
  });
});
