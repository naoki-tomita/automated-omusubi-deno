# automated-omusubi

Improved [omusubi](https://www.npmjs.com/package/omusubi). You do not need to
register.

# how to use

**important**

You must enable TypeScript compiler options. And run deno with option
`deno run xxxx.ts -c tsconfig.ts`.

```javascript
{
  "compilerOptions": {
    // ...
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
    // ...
  }
}
```

## Example usage

```typescript
import {
  binding,
  named,
} from "https://deno.land/x/automated-omusubi@0.0.3/mod.ts";

@named
class Injectable {
  x = "foo";
}

class Injected {
  @binding
  foo!: Injectable;

  func() {
    return this.foo; // <-- Injectable instance.
  }
}

console.log(new Injected().func());
```

## identifier specified injection

It can be used in `dependency inversion principle`

```typescript
import {
  bindBy,
  namedWith,
} from "https://deno.land/x/automated-omusubi@v0.0.1/mod.ts";

abstract class AbstractInjectable {
  x = "bar";
}

@namedWith(AbstractInjectable)
class Injectable extends AbstractInjectable {
  y = "foo";
}

class Injected {
  @bindBy(AbstractInjectable)
  foo!: AbstractInjectable;

  func() {
    return this.foo; // <-- Injectable instance.
  }
}

console.log(new Injected().func());
```

## identifier specified injection and explicitly instance registration

```typescript
import {
  bind,
  register,
} from "https://deno.land/x/automated-omusubi@v0.0.1/mod.ts";

class Injectable {
  y = "foo";
  z: string;
  constructor(z: string) {
    this.z = z;
  }
}

class Injected {
  @bind
  foo!: Injectable;

  func() {
    return this.foo; // <-- Injectable instance.
  }
}

register(new Injectable("bar")).as(Injectable);
console.log(new Injected().func());
```
