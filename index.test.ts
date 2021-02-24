import { resetBinding } from "./index.ts";
import { bindBy, binding, named, namedWith, register, instanceOf } from "./mod.ts";
import { assert, assertStrictEquals } from "./test_deps.ts";



Deno.test("binding and named / should access TestInjectable1 from TestInjected1", () => {
  resetBinding();
  @named
  class TestInjectable1 {
    foo = "bar" as const;
  }

  class TestInjected1 {
    @binding
    binding!: TestInjectable1;
  }

  const target = new TestInjected1();
  assert(target.binding instanceof TestInjectable1);
});

Deno.test("bindBy and nameWith / should access TestInjectable2 from TestInjected2", () => {
  resetBinding();
  @namedWith("foo")
  class TestInjectable2 {
    foo = "bar" as const;
  }

  class TestInjected2 {
    @bindBy("foo")
    binding!: TestInjectable2;
  }

  const target = new TestInjected2();
  assert(target.binding instanceof TestInjectable2);
});

Deno.test("nameWith and register / should access TestInjectable3 from TestInjected3", () => {
  resetBinding();
  class TestInjectable3 {
    foo = "bar" as const;
  }

  class TestInjected3 {
    @bindBy("bar")
    binding!: TestInjectable3;
  }

  const injectable = new TestInjectable3();
  const injected = new TestInjected3();
  register(injectable).as("bar");
  assert(injected.binding instanceof TestInjectable3);
});

Deno.test("instanceOf should return registered instance.", () => {
  resetBinding();
  @named
  class TestInjectable4 {
    foo = "bar" as const;
  }

  assert(instanceOf(TestInjectable4) instanceof TestInjectable4);
})
