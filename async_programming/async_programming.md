> 자바스크립트는 싱글 스레드 프로그래밍 언어이다.
> 그렇다면 브라우저에서는 어떻게 많은 일들을 한번에 처리하고, nodejs환경에서 동시 들어오는 요청들을 관리할 수 있을까 ?

**실행 컨텍스트에서 나오는 개념들이 많다.**

자바스크립트 엔진은 단 하나의 실행 컨텍스트를 갖는다. 이는 함수를 실행할 수 있는 창구가 단 하나이고 동시에 두개의 함수를 실행할 수 없다.

```js
function sleep(func, delay) {
  const delayUntil = Date.now() + delay;

  while (Date.now() < delayUntil);

  func();
}

function foo() {
  console.log("foo");
}

function bar() {
  console.log("bar");
}
sleep(foo, 3000);
bar();
```

![스크린샷 2024-01-24 오후 7 09 06](https://github.com/HolyWatter/js-lovedive/assets/98324846/62254f85-3f04-4924-96f3-e2d52948ba05)

위와 같이 동기 식으로 처리 한다면 태스크를 순서대로 하나씩 처리하므로 순서가 보장된다는 장점이 있다.

```js
function sleep(func, delay) {
  setTimeout(() => {
    func();
  }, delay);
}

function foo() {
  console.log("foo");
}

function bar() {
  console.log("bar");
}

sleep(foo, 3000);
bar();
//bar
//foo
```

비동기 처리 방식은 현재 실행중인 태스크가 종료되지 않은 상태라 해도 다음 태스크를 곧바로 실행하므로 블로킹이 발생하지 않는 다는 장점이 있지만, 실행순서는 보장되지 않는다.

### 이벤트 루프와 태스크 큐

이 이벤트 루프 때문에 자바스크립트가 동시에 여러 일들을 처리하는 것 처럼 보인다.

![스크린샷 2024-01-24 오후 7 09 27](https://github.com/HolyWatter/js-lovedive/assets/98324846/1a4cfe99-10bd-40a8-8f0e-734d411ad919)


- 콜스택 : 실행컨텍스트 스택.
- 힙 : 객체가 저장되는 메모리 공간이다. 객체는 원시 값과는 달리 크기가 정해져 있지 않아 런타임에 동적할당 해야함 => 힙은 구조화되어 있지 않다.

소스코드의 평가와 실행을 제외한 모든 처리는 자바스크립트 엔진을 구동하는 환경인 브라우저 또는 Nodejs가 담당한다.
이들은 태스트큐와 이벤트 루프를 제공한다.

- 태스크 큐 : 비동기 함수의 콜백 함수 또는 이벤트 핸들러가 일시적으로 보관되는 영역
- 이벤트 루프 : 이벤트루프는 콜스택에 현재 실행중인 실행 컨텍스트가 있는지, 그리고 태스크 큐에 대기중인 함수가 있는지 반복해서 확인한다. 콜 스택이 비어있고 태스크 큐에 대기 중인 함수가 있다면 이벤트 루프는 순차적으로 태스크큐에 대기중인 함수를 콜스택으로 이동시킨다.

```js
function foo () {
	console .log ( ' foo ' ) ;
	function bar() { console .log ( bar' );
}

setTimeout(foo, 0); // 0초(실저~ 4ms) 후에 foo 함수가 호출된다. bar() ;

```

- 전역코드가 평가되어 전역 실행컨텍스트가 생성되고 콜스택에 푸시된다.

- 전역코드가 실행되기 시작하여 setTimeout함수가 호출된다. (함수 실행컨텍스트 생성)

- 함수가 실행되면 콜백함수를 호출 스케줄링하고 종료되어 콜스택에서 제거된다. 타이머 설정과 타이머가 만료되면 콜백함수를 태스크큐에 푸쉬하는 것은 브라우저의 역할이다.

- 다음 두개가 병렬처리

1. 브라우저는 타이머를 설정하고 타이머의 만료를 기다림. 타이머가 만료되면 foo가 태스크 큐에 푸쉬 시간 후에 콜백함수 foo가 태스크큐에 푸시되어 대기하게 됨. (셋타임함수가 정확히 지연시간 후에 호출된다는 보장이 없다 콜스택이 비어야 호출되므로,,,)

2. bar함수가 호출되어 bar함수의 함수실행컨텍스트가 생성, 콜스택에 푸쉬되어 실행중인 실행컨텍스트가 된다. 이후 bar함수가 종료되어 콜 스택에서 팝된다. 브라우저가 타이머를 설정한 후 시간만큼 경과했다면 foo 함수는 아직 태스크 큐에서 대기중이다.

- 전역코드 실행이 종료되고 전역 실행 컨텍스트가 콜스택에서 팝된다. 콜스택에는 아무런 실행컨텍스트도 존재하지 않음

- 이벤트 루프에 의해 콜스택이 비어 있음이 감지, 태스크 큐에서 대기중인 콜백함수 foo가 이벤트 루프에 의해 콜스택에 푸쉬됨.

자바스크립트는 싱글스레드 방식으로 동작한다. 이때 싱글 스레드 방식으로 동작하는 것은 브라우저가 아니라 브라우저에 내장된 자바스크립트 엔진이다.
자바스크립트엔진은 싱글스레드로 동작하지만 브라우저는 멀티 스레드로 동작한다.
