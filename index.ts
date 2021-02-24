import { Reflect } from "./deps.ts";
const map = new Map();
export const named: ClassDecorator = (Target: any) => {
  map.set(Target, new Target());
  return Target;
};

export function namedWith(identifier: any): ClassDecorator {
  return (Target: any) => {
    map.set(identifier, new Target());
    return Target;
  };
}

export const binding: PropertyDecorator = (Target: any, key) => {
  Object.defineProperty(Target, key, {
    get() {
      return map.get(Reflect.getMetadata("design:type", Target, key));
    },
  });
};
export function bindBy(identifier: any): PropertyDecorator {
  return (Target, key) => {
    Object.defineProperty(Target, key, {
      get() {
        return map.get(identifier);
      },
    });
  };
}

export function register(instance: any) {
  return {
    as(identifier: any) {
      map.set(identifier, instance);
    },
  };
}

export function instanceOf(identifier: any) {
  return map.get(identifier);
}

export function resetBinding() {
  map.clear();
}
