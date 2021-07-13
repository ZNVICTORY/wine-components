// test("用例名称", callback)

test("test common matcher", () => {
      expect(2 + 2).toBe(4);
      expect(2+2).not.toBe(6);
})
test("test to true or false", () =>{
      expect(1).toBeTruthy();
      expect(0).toBeFalsy();
})
test("test number", () => {
      expect(4).toBeGreaterThan(3);
      expect(2).toBeLessThan(3);
})
test("test object", () => {
      expect({one: 1, two: 2}).toEqual({one: 1, two:2});
})