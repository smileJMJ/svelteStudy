# Svelte란?
- 컴포넌트를 JS로 바꿔주는 컴파일러
- 프레임워크   
- .svelete 파일로 구성하여 HTML, CSS, JS를 캡슐화한 재사용 가능한 코드 블록으로 생성   


(참고)   
<a href="https://svelte.dev/blog/the-easiest-way-to-get-started" target="_blank">https://svelte.dev/blog/the-easiest-way-to-get-started</a>      
<a href="https://svelte.dev/tutorial/basics" target="_blank">https://svelte.dev/tutorial/basics</a>   

<br>
<br>

## 변수 선언 및 Data 추가
```
<script>
	let name = 'world';
</script>

<h1>Hello {name}!</h1>
```

<br>
<br>

## styling
```
<p>This is a paragraph.</p>

<style>
	/* Write your CSS here */
	p {
		color: purple;
		font-family: 'Comic Sans MS', cursive;
		font-size: 2em;
	}
</style>

```

<br>
<br>

## Nested Components
```
// App.svelte
<script>
	import Nested from './Nested.svelte';
</script>

<p>This is a App.</p>
<Nested/>


// Nested.svelte
<p>Nested Components: This is Nested.</p>
```

<br>
<br>

## HTML Tags
```
{@html strHtml}
```

```
<script>
	let string = `this string contains some <strong>HTML!!!</strong>`; // string
	let strHtml = '<div class="box"><p>String HTML Tag</p></div>';
</script>

<p>{string}</p>
{@html strHtml}
```
- 기본 텍스트는 string으로 인식
- string HTML 주입 시에는 ``{@html ...}`` 사용하기

<br>
<br>

## Making an app
- 각 빌드 툴에 Svelte를 연결해서 사용 가능하며, svelte에서 플러그인을 제공하고 있음   
ex) vite-plugin-svelte, rollup-plugin-svelte, svelte-loader 등   
(참고) https://sveltesociety.dev/tools/   

※ vite   
모듈 수가 많은 대규모 프로젝트의 번들링 속도를 높이고자 브라우저에서 지원하는 ES Modules(ESM) 및 네이티브 언어로 작성된 JavaScript 도구 등을 활용한 프론트엔드 개발 툴


※ rollup   
작은 코드 조각을 라이브러리/어플리케이션과 같이 더 크고 복잡한 형태로 컴파일하는 모듈 번들러   


<br>
<br>
<br>

# Reactivity
Svelte는 DOM을 애플리케이션 상태와 동기화하기 위한 강력한 반응성 시스템이 있음   

<br>
<br>

## Assignments
```
<script>
	let count = 0; // 변수 선언으로 상태 추적함

	function incrementCount() {
		count += 1;
	}
</script>

<button on:click={incrementCount}>
	Clicked {count} {count === 1 ? 'time' : 'times'}
</button>
```

<br>
<br>

## Declarations
- Svelte는 state 값이 변할 때 자동적으로 DOM을 변경함
- state 연산이 필요할 때, state값이 변하면 재연산을 진행함 

<br>

```
<script>
    $: 변수명 = state 연산;
</script>
```
의미: 참조된 값이 변경될 때마다 이 코드를 다시 실행하라   


Ex)
```
<script>
	let count = 0;
	$: doubled = count * 2;

	function handleClick() {
		count += 1;
	}
</script>

<button on:click={handleClick}>
	Clicked {count} {count === 1 ? 'time' : 'times'}
</button>
<p>
	doubled: {doubled}
</p>
```

<br>
<br>

## Statements
- state의 변화 발생 시 값 할당 및 구문 실행도 가능함
```
<script>
	let count = 0;
	$: console.log(`the count is ${count}`);
	$: {
		console.log(`the count is ${count}`);
		console.log(`the double is ${count * 2}`);
	}
	$: if(count >= 10) {
		console.log('count is dangerously high!');
		count = 9;
	}

	function handleClick() {
		count += 1;
	}
</script>
```

<br>
<br>

## Updating arrays and objects
- array, object 등 불변성 유지해야 함
```
<script>
	let numArr = [];
	let obj = {};
	
	function notReactArr() {
		numArr.push(1);
	}
	function notReactObj() {
		Object.assign(obj, {a: 1});
	}
	function reactArr() {
		numArr = [...numArr, 1];
	}
	function reactObj() {
		obj = {...obj, a: 1};
	}
</script>

<button on:click={notReactArr}>notReactArr: {numArr.length}</button>
<button on:click={reactArr}>reactArr: {numArr.length}</button>
<br>
<button on:click={notReactObj}>notReactArr: {obj.a}</button>
<button on:click={reactObj}>reactObj: {obj.a}</button>
```

<br>
<br>

# Props

## Declaring props
```
// child components
<script>
export let variable;
</script>
```

- child components에서 ``export``로 props property 선언해야 함
- 이 때, 값을 할당하면 props 없을 때 default value로 노출됨
- object properties는 ``spread``를 이용함

<br>

[ export 를 이용한 props 선언 ]
```
// App.svelte
<script>
	import Nested from './Nested.svelte';
</script>

<Nested answer={42}/>

// Nested.svelte
<script>
    // export로 props property 정의해야 함
	export let answer = 'a mystery';  // 할당한 값은 default value
</script>

<p>The answer is {answer}</p>
```

<br>

[ object props - spread 사용하지 않을 때 ]
- props는 하나임

```
// App.svelte
<script>
	import Info from './Info.svelte';

	const pkg = {
		name: 'svelte',
		version: 3,
		speed: 'blazing',
		website: 'https://svelte.dev'
	};
</script>

<Info props={pkg}/>

// Info.svelte
<script>
	export let props;
	const {name, speed, version, website} = props; // props를 object로 받아서 구조분해할당 가능
</script>

<p>
	The <code>{name}</code> package is {speed} fast.
	Download version {version} from <a href="https://www.npmjs.com/package/{name}">npm</a>
	and <a href={website}>learn more here</a>
</p>
```

<br>

[ object props - spread 사용 ]
```
<Component {...obj}/>
```

- spread props로 전달 시, child component에서는 각각 개별 props로 전달받음

```
// App.svelte
<script>
	import Info from './Info.svelte';

	const pkg = {
		name: 'svelte',
		version: 3,
		speed: 'blazing',
		website: 'https://svelte.dev'
	};
</script>

<Info {...pkg}/>

// Info.svelte 동일
```

<br>
<br>

# Login
## If blocks
```
<script>
	let user = { loggedIn: false };

	function toggle() {
		user.loggedIn = !user.loggedIn;
	}
</script>

{#if user.loggedIn}
<button on:click={toggle}>
	Log out
</button>
{/if}

{#if !user.loggedIn}
<button on:click={toggle}>
	Log in
</button>
{/if}
```

<br>

## Else blocks
```
// 위와 script 동일

{#if user.loggedIn}
	<button on:click={toggle}>
		Log out
	</button>
{:else}
	<button on:click={toggle}>
		Log in
	</button>
{/if}
```

<br>

- "#" : block opening tag   
- "/" : block closing tag   
- ":" : block continuation tag

<br>

## Else-if blocks
```
<script>
	let x = 7;
</script>

{#if x > 10}
	<p>{x} is greater than 10</p>
{:else if 5 > x}
	<p>{x} is less than 5</p>
{:else}
	<p>{x} is between 5 and 10</p>
{/if}
```
<br>

## Each blocks
```
<script>
	let cats = [
		{ id: 'J---aiyznGQ', name: 'Keyboard Cat' },
		{ id: 'z_AbfPXTKms', name: 'Maru' },
		{ id: 'OUtn3pvWmpg', name: 'Henri The Existential Cat' }
	];
</script>

<h1>The Famous Cats of YouTube</h1>

<ul>
	{#each cats as cat, i}
	<li><a target="_blank" href="https://www.youtube.com/watch?v={cat.id}">
			{i+1} : {cat.name}
		</a></li>
	{/each}
</ul>
```

<br>

## Keyed each blocks
```
{#each things as thing (thing.id)}
	<Thing name={thing.name}/>
{/each}
```

- 반복을 통한 dom 생성 시 특정한 고유값을 key로 주입해야 state/props 변경 시 해당 dom node를 변경함   
※ 해당 dom node를 찾을 때 고유값이 없으면 마지막 node부터 변경함
- react의 key, vue의 :key 

(react) key
https://ko.reactjs.org/docs/lists-and-keys.html

(vue) key
https://v3.ko.vuejs.org/guide/migration/key-attribute.html#%E1%84%80%E1%85%A2%E1%84%8B%E1%85%AD

<br>

```
// App.svelte
<script>
	import Thing from './Thing.svelte';

	let things = [
		{ id: 1, name: 'apple' },
		{ id: 2, name: 'banana' },
		{ id: 3, name: 'carrot' },
		{ id: 4, name: 'doughnut' },
		{ id: 5, name: 'egg' },
	];

	function handleClick() {
		things = things.slice(1);
	}
</script>

<button on:click={handleClick}>
	Remove first thing
</button>

{#each things as thing (thing.id)}
	<Thing name={thing.name}/>
{/each}


// Thing.svelte
<script>
	const emojis = {
        apple: "🍎",
        banana: "🍌",
        carrot: "🥕",
        doughnut: "🍩",
        egg: "🥚"
	}

	// the name is updated whenever the prop value changes...
	export let name;

	// ...but the "emoji" variable is fixed upon initialisation of the component
	const emoji = emojis[name];
</script> 

<p>
	<span>The emoji for { name } is { emoji }</span>
</p>

<style>
	p {
		margin: 0.8em 0;
	}
	span {
		display: inline-block;
		padding: 0.2em 1em 0.3em;
		text-align: center;
		border-radius: 0.2em;
		background-color: #FFDFD3;
	}
</style>

```

<br>
<br>

## Await blocks
- Markup에서 await 구문 사용 가능

```
{#await promise}
	<p>...waiting</p>
{:then number}
	<p>The number is {number}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
```
(ex)
```
<script>
	async function getRandomNumber() {
		const res = await fetch(`/tutorial/random-number`);
		const text = await res.text();

		if (res.ok) {
			return text;
		} else {
			throw new Error(text);
		}
	}

	let promise = getRandomNumber();

	function handleClick() {
		promise = getRandomNumber();
	}
</script>

<button on:click={handleClick}>
	generate random number
</button>

<!-- replace this element -->
{#await promise}
<p>...waiting</p>
{:then strNumber}
<p>The string number is {strNumber}</p>
{:catch error}
<p>This is error: {error.message}</p>
{/await}
```

- then 구문만 사용 시 아래와 같이 사용 가능
```
{#await promise then value}
	<p>the value is {value}</p>
{/await}
```
<br>
<br>

# Events
## DOM events
```
<div on:mousemove={handleMousemove}>
	The mouse position is {m.x} {m.y}
</div>
```

(ex)
```
<script>
	let m = { x: 0, y: 0 };

	function handleMouseClick(event) {
		m.x = event.clientX;
		m.y = event.clientY;
	}
</script>

<div on:click={handleMouseClick}>
	The mouse position is {m.x} x {m.y}
</div>

<style>
	div { width: 100%; height: 100%; }
</style>
```

<br>

## Inline handlers
```
<div on:mousemove={e => m = { x: e.clientX, y: e.clientY }}>
	The mouse position is {m.x} x {m.y}
</div>
```

<br>

## Event modifiers
```
<button on:click|once={handleClick}>
	Click me
</button>

or

<button on:click|once|capture={handleClick}>
	Click me
</button>
```
- preventDefault: e.preventDefault()
- stopPropagation: e.stopPropagation()
- passive: 터치/휠 이벤트 발생 시 스크롤 성능 개선
- nonpassive: (passive:false)
- capture
- once
- self: element와 e.target이 같을 때 핸들러 발생
- trusted

<br>

## Component events
```
// child component
<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function sayHello() {
		dispatch('message', {
			text: 'Hello!'
		});
	}
</script>

// parent component
<Inner on:message={handleMessage}/>
```
- child components에서 svelte의 createEventDispatcher를 이용해 parent component의 이벤트 실행 가능함   
※ vue: $emit
- 단, createEventDispatcher는 초기 instance 생성 시에 호출해야 함
- setTimeout 콜백 등 추후에 실행되는 코드에서는 동작하지 않음

<br>
<br>

# Bindings
- 기본적으로 svelte는 단방향(top-down)의 data flow를 가짐
- input 등의 요소에서 ``bind:`` directive를 이용하면 양방향 가능 

```
<input bind:value={name}>
<input type=number bind:value={a} min=0 max=10>
<input type=range bind:value={a} min=0 max=10>
<input type=checkbox bind:checked={yes}>
<input type=radio bind:group={scoops} name="scoops" value={1}>
<textarea bind:value={value}></textarea>
<select bind:value={selected} on:change="{() => answer = ''}">
<div
	contenteditable="true"
	bind:innerHTML={html}
></div>
```
- bind:value
- bind:checked
- bind:group
- bind:innerHTML
- bind:this



(ex) bind:this
```
<script>
	let input;

	export function focus() {
		input.focus();
	}
</script>

<input bind:this={input} />
<button on:click={focus}>
Focus field
</button>
```

<br>
<br>

# LifeCycle
- onMount
- onDestroy
- beforeUpdate
- afterUpdate
- tick

(ex) onMount
```
<script>
	import { onMount } from 'svelte';

	let photos = [];

	onMount(async () => {
		const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=20`);
		photos = await res.json();
	});
</script>
```

(ex) beforeUpdate, afterUpdate
```
let div;
let autoscroll;

beforeUpdate(() => {
	autoscroll = div && (div.offsetHeight + div.scrollTop) > (div.scrollHeight - 20);
});

afterUpdate(() => {
	if (autoscroll) div.scrollTo(0, div.scrollHeight);
});
```
<br>

※ tick   
```
import { tick } from 'svelte';

await tick();
```
- 다른 라이프사이클과 달리 언제든 호출 가능
- pending -> resolve 가능한 promise 반환   
- state 변경 시 효율적인 브라우저 작업을 위해 다른 작업들이 있는지 다음 마이크로태스크까지 기다림

```
<script>
	import { tick } from 'svelte';
	
	let text = `Select some text and hit the tab key to toggle uppercase`;

	async function handleKeydown(event) {
		if (event.key !== 'Tab') return;

		event.preventDefault();

		const { selectionStart, selectionEnd, value } = this;
		const selection = value.slice(selectionStart, selectionEnd);

		const replacement = /[a-z]/.test(selection)
			? selection.toUpperCase()
			: selection.toLowerCase();

		text = (
			value.slice(0, selectionStart) +
			replacement +
			value.slice(selectionEnd)
		);

		// this has no effect, because the DOM hasn't updated yet
		await tick();
		this.selectionStart = selectionStart;
		this.selectionEnd = selectionEnd;
	}
</script>

<style>
	textarea {
		width: 100%;
		height: 200px;
	}
</style>

<textarea value={text} on:keydown={handleKeydown}></textarea>
```   

<br>
<br>

# Stores
## writable stores
(1) store 생성
```
// store.js
import { writable } from 'svelte';

export const count = writable(0);
```
(2) store 구독 (subscribe)
```
// App.svelte
import { count } from './store.js';

let countValue; // state

count.subscribe(value => {
	countValue = value;
});
```
(3) update / set 으로 state 변경
```
// Incrementer.svelte
function increment() {
	count.update(n => n + 1);
}

// Resetter.svelte
function reset() {
	count.set(0);
}
```

(4) 컴포넌트는 다수의 인스턴스화/제거(destroy)로 인해 메모리 누수가 발생할 수 있음   
=> onDestroy에서 unsubscribe 호출
```
const unsubscribe = count.subscribe(value => {
	countValue = value;
});

onDestroy(unsubscribe);
``` 

<br>

## Auto-subscriptions
```
$store변수
```
- Auto-subscription은 store 변수가 top-level scope에서 정의/import 될 때만 동작함

(ex)
```
// App.svelte

<script>
	import { count } from './stores.js';
	import Incrementer from './Incrementer.svelte';
	import Decrementer from './Decrementer.svelte';
	import Resetter from './Resetter.svelte';
</script>

<h1>The count is {$count}</h1>
```

<br>

## Readable stores
- 외부에서 값을 설정해서 store 내부에서는 해당 값을 읽어야할 때  (ex. 마우스 위치 / 지리적 위치 등) readable store 사용함
```
// store.js
import { readable } from 'svelte/store';

export const time = readable(null, function start(set) {
	const interval = setInterval(() => {
		set(new Date());
	}, 1000);

	return function stop() {
		clearInterval(interval);
		console.log('stop!!');
	};
});

// App.svelte
<script>
	import { time } from './stores.js';

	const formatter = new Intl.DateTimeFormat('en', {
		hour12: true,
		hour: 'numeric',
		minute: '2-digit',
		second: '2-digit'
	});
	
	let currentTime;
	
	const unsubscribe = time.subscribe(value => {
		currentTime = value;
	});
	
	onDestroy(() => {
		setTimeout(unsubscribe, 3000);
	});
</script>

<h1>The time is {formatter.format(currentTime)}</h1>
```

<br>

## Derived stores
- 하나 이상의 다른 스토어로부터 파생된 값을 사용할 수 있는 스토어
```
// App.svelte
<script>
import { time, elapsed } from './stores.js';
</script>

<h1>The time is {formatter.format($time)}</h1>

<p>
	This page has been open for
	{$elapsed} {$elapsed === 1 ? 'second' : 'seconds'}
</p>

// store.js
import { readable, derived } from 'svelte/store';

const start = new Date();

export const elapsed = derived(
	time,
	$time => Math.round(($time - start) / 1000)
);
```

<br>

## Custom stores
- object 타입으로 직접 구현한 store
```
// App.svelte
<script>
	import { count } from './stores.js';
</script>

<h1>The count is {$count}</h1>

<button on:click={count.increment}>+</button>
<button on:click={count.decrement}>-</button>
<button on:click={count.reset}>reset</button>

// store.js
import { writable } from 'svelte/store';

function createCount() {
	const { subscribe, set, update } = writable(0);

	return {
		subscribe,
		increment: () => update(n => n + 1),
		decrement: () => update(n => n - 1),
		reset: () => set(0)
	};
}

export const count = createCount();
```

<br>
<br>

# Classes
```
<button
	class="{current === 'foo' ? 'selected' : ''}"
	on:click="{() => current = 'foo'}"
>foo</button>

<button
	class:selected="{current === 'foo'}"
	on:click="{() => current = 'foo'}"
>foo</button>

<div class:big={big}>
	<!-- ... -->
</div>

<div class:big>
	<!-- ... -->
</div>
```