// 클로저 예시
// 따라만 해본 것일 뿐 실제 구현과 다름.

function useState(initialValue) {
  let _value = initialValue;
  let _prev = null;

  function state() {
    return _value;
  }

  function setState(nextValue) {
    _prev = _value;

    if (typeof nextValue === "function") {
      _value = nextValue(_prev);
    } else {
      _value = nextValue;
    }
  }

  return [state, setState];
}
