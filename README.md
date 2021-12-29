# Will this React global state work in concurrent rendering?

Test tearing and branching in React concurrent rendering

- [Discussion in React 18 WG](https://github.com/reactwg/react-18/discussions/116)

## Introduction

React 18 is coming with a new feature called "concurrent rendering".
With global state, there's a theoretical issue called "tearing"
that might occur in React concurrent rendering.

Let's test the behavior!

## What is tearing?

- [What is tearing in React 18 WG](https://github.com/reactwg/react-18/discussions/69)
- [Stack Overflow](https://stackoverflow.com/questions/54891675/what-is-tearing-in-the-context-of-the-react-redux)
- [Talk by Mark Erikson](https://www.youtube.com/watch?v=yOZ4Ml9LlWE&t=933s)
- [Talk by Flarnie Marchan](https://www.youtube.com/watch?v=V1Ly-8Z1wQA&t=1079s)
- Some other resources
  - https://github.com/reactjs/rfcs/pull/147
  - https://gist.github.com/bvaughn/054b82781bec875345bd85a5b1344698

## What is branching?

- Old resources
  - https://reactjs.org/docs/concurrent-mode-intro.html

## How does it work?

A small app is implemented with each library.
The state has one count.
The app shows the count in fifty components.

There's a button outside of React and
if it's clicked it will trigger state mutation.
This is to emulate mutating an external state outside of React,
for example updating state by Redux middleware.

The render has intentionaly expensive computation.
If the mutation happens during rendering with in a tree,
there could be an inconsistency in the state.
If it finds the inconsistency, the test will fail.

## How to run

```bash
git clone https://github.com/dai-shi/will-this-react-global-state-work-in-concurrent-rendering.git
cd will-this-react-global-state-work-in-concurrent-rendering
yarn install
yarn run build-all
yarn run jest
```

To automatically run tests and update the README.md on OSX:
```
yarn jest:json
yarn jest:update
```

## Screencast (old)

<img src="https://user-images.githubusercontent.com/490574/61502196-ce109200-aa0d-11e9-9efc-6203545d367c.gif" alt="Preview" width="350" />

## Test scenario

- With useTransition
  - Level 1
    - 1: No tearing finally on update
    - 2: No tearing finally on mount
  - Level 2
    - 3: No tearing temporarily on update
    - 4: No tearing temporarily on mount
  - Level 3
    - 5: Can interrupt render (time slicing)
    - 6: Can branch state (wip state)
- With useDeferredValue
  - Level 1
    - 7: No tearing finally on update
    - 8: No tearing finally on mount
  - Level 2
    - 9: No tearing temporarily on update
    - 10: No tearing temporarily on mount

## Results

<details>
<summary>Raw Output</summary>

```
   With useTransition
     Level 1
       ✓ No tearing finally on update (4727 ms)
       ✓ No tearing finally on mount (9489 ms)
     Level 2
       ✓ No tearing temporarily on update (8693 ms)
       ✓ No tearing temporarily on mount (9451 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3736 ms)
       ✓ Can branch state (wip state) (5339 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9746 ms)
       ✓ No tearing finally on mount (5786 ms)
     Level 2
       ✓ No tearing temporarily on update (14526 ms)
       ✓ No tearing temporarily on mount (5542 ms)
 react-redux
   With useTransition
     Level 1
       ✓ No tearing finally on update (7888 ms)
       ✓ No tearing finally on mount (4553 ms)
     Level 2
       ✓ No tearing temporarily on update (12826 ms)
       ✓ No tearing temporarily on mount (4495 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7801 ms)
       ✕ Can branch state (wip state) (6550 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9616 ms)
       ✓ No tearing finally on mount (4546 ms)
     Level 2
       ✓ No tearing temporarily on update (14548 ms)
       ✓ No tearing temporarily on mount (4504 ms)
 zustand
   With useTransition
     Level 1
       ✓ No tearing finally on update (8012 ms)
       ✓ No tearing finally on mount (4554 ms)
     Level 2
       ✓ No tearing temporarily on update (12795 ms)
       ✓ No tearing temporarily on mount (4496 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7790 ms)
       ✕ Can branch state (wip state) (6533 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9584 ms)
       ✓ No tearing finally on mount (4525 ms)
     Level 2
       ✓ No tearing temporarily on update (14588 ms)
       ✓ No tearing temporarily on mount (4488 ms)
 react-tracked
   With useTransition
     Level 1
       ✓ No tearing finally on update (5515 ms)
       ✓ No tearing finally on mount (15369 ms)
     Level 2
       ✓ No tearing temporarily on update (8570 ms)
       ✓ No tearing temporarily on mount (15300 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3590 ms)
       ✓ Can branch state (wip state) (8201 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (15329 ms)
       ✓ No tearing finally on mount (6439 ms)
     Level 2
       ✓ No tearing temporarily on update (19386 ms)
       ✓ No tearing temporarily on mount (6332 ms)
 constate
   With useTransition
     Level 1
       ✓ No tearing finally on update (4514 ms)
       ✓ No tearing finally on mount (8543 ms)
     Level 2
       ✓ No tearing temporarily on update (8642 ms)
       ✓ No tearing temporarily on mount (6536 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3579 ms)
       ✓ Can branch state (wip state) (5206 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9578 ms)
       ✓ No tearing finally on mount (5609 ms)
     Level 2
       ✓ No tearing temporarily on update (14544 ms)
       ✓ No tearing temporarily on mount (5497 ms)
 react-hooks-global-state
   With useTransition
     Level 1
       ✓ No tearing finally on update (5528 ms)
       ✓ No tearing finally on mount (9364 ms)
     Level 2
       ✓ No tearing temporarily on update (8582 ms)
       ✕ No tearing temporarily on mount (9285 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3591 ms)
       ✕ Can branch state (wip state) (10081 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11236 ms)
       ✓ No tearing finally on mount (5571 ms)
     Level 2
       ✓ No tearing temporarily on update (15313 ms)
       ✕ No tearing temporarily on mount (5464 ms)
 use-context-selector
   With useTransition
     Level 1
       ✓ No tearing finally on update (5534 ms)
       ✓ No tearing finally on mount (11372 ms)
     Level 2
       ✓ No tearing temporarily on update (8566 ms)
       ✓ No tearing temporarily on mount (13301 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3579 ms)
       ✓ Can branch state (wip state) (8163 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (15337 ms)
       ✓ No tearing finally on mount (6409 ms)
     Level 2
       ✓ No tearing temporarily on update (19557 ms)
       ✓ No tearing temporarily on mount (6339 ms)
 use-subscription
   With useTransition
     Level 1
       ✓ No tearing finally on update (5564 ms)
       ✓ No tearing finally on mount (8623 ms)
     Level 2
       ✓ No tearing temporarily on update (8663 ms)
       ✕ No tearing temporarily on mount (8395 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3698 ms)
       ✕ Can branch state (wip state) (10216 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11333 ms)
       ✓ No tearing finally on mount (5718 ms)
     Level 2
       ✓ No tearing temporarily on update (15421 ms)
       ✕ No tearing temporarily on mount (5616 ms)
 apollo-client
   With useTransition
     Level 1
       ✓ No tearing finally on update (7650 ms)
       ✓ No tearing finally on mount (4734 ms)
     Level 2
       ✕ No tearing temporarily on update (11896 ms)
       ✓ No tearing temporarily on mount (4646 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7266 ms)
       ✕ Can branch state (wip state) (5852 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9216 ms)
       ✓ No tearing finally on mount (4614 ms)
     Level 2
       ✕ No tearing temporarily on update (11928 ms)
       ✓ No tearing temporarily on mount (4606 ms)
 recoil
   With useTransition
     Level 1
       ✓ No tearing finally on update (7952 ms)
       ✓ No tearing finally on mount (8516 ms)
     Level 2
       ✓ No tearing temporarily on update (12998 ms)
       ✓ No tearing temporarily on mount (9452 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7932 ms)
       ✕ Can branch state (wip state) (7559 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9407 ms)
       ✓ No tearing finally on mount (5619 ms)
     Level 2
       ✓ No tearing temporarily on update (13475 ms)
       ✓ No tearing temporarily on mount (5531 ms)
 jotai
   With useTransition
     Level 1
       ✓ No tearing finally on update (6658 ms)
       ✓ No tearing finally on mount (11485 ms)
     Level 2
       ✓ No tearing temporarily on update (9679 ms)
       ✕ No tearing temporarily on mount (11433 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4698 ms)
       ✕ Can branch state (wip state) (11274 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (16507 ms)
       ✓ No tearing finally on mount (10537 ms)
     Level 2
       ✓ No tearing temporarily on update (20821 ms)
       ✕ No tearing temporarily on mount (13417 ms)
 jotai-versioned-write
   With useTransition
     Level 1
       ✓ No tearing finally on update (5648 ms)
       ✓ No tearing finally on mount (8411 ms)
     Level 2
       ✓ No tearing temporarily on update (9572 ms)
       ✓ No tearing temporarily on mount (9337 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4590 ms)
       ✓ Can branch state (wip state) (6172 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11478 ms)
       ✓ No tearing finally on mount (5611 ms)
     Level 2
       ✓ No tearing temporarily on update (15492 ms)
       ✓ No tearing temporarily on mount (5502 ms)
 use-atom
   With useTransition
     Level 1
       ✓ No tearing finally on update (7590 ms)
       ✓ No tearing finally on mount (14410 ms)
     Level 2
       ✓ No tearing temporarily on update (9594 ms)
       ✓ No tearing temporarily on mount (14331 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4603 ms)
       ✕ Can branch state (wip state) (18128 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (16557 ms)
       ✓ No tearing finally on mount (10433 ms)
     Level 2
       ✓ No tearing temporarily on update (20585 ms)
       ✓ No tearing temporarily on mount (10301 ms)
 valtio
   With useTransition
     Level 1
       ✓ No tearing finally on update (7849 ms)
       ✓ No tearing finally on mount (4568 ms)
     Level 2
       ✓ No tearing temporarily on update (12811 ms)
       ✓ No tearing temporarily on mount (4513 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7803 ms)
       ✕ Can branch state (wip state) (6703 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9697 ms)
       ✓ No tearing finally on mount (4658 ms)
     Level 2
       ✓ No tearing temporarily on update (14692 ms)
       ✓ No tearing temporarily on mount (4630 ms)
 effector
   With useTransition
     Level 1
       ✓ No tearing finally on update (4621 ms)
       ✓ No tearing finally on mount (9521 ms)
     Level 2
       ✕ No tearing temporarily on update (8732 ms)
       ✕ No tearing temporarily on mount (9463 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3698 ms)
       ✕ Can branch state (wip state) (2999 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9709 ms)
       ✓ No tearing finally on mount (5704 ms)
     Level 2
       ✓ No tearing temporarily on update (14669 ms)
       ✕ No tearing temporarily on mount (5604 ms)
 react-rxjs
   With useTransition
     Level 1
       ✓ No tearing finally on update (8064 ms)
       ✓ No tearing finally on mount (8357 ms)
     Level 2
       ✓ No tearing temporarily on update (12805 ms)
       ✕ No tearing temporarily on mount (8310 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7805 ms)
       ✕ Can branch state (wip state) (6555 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9586 ms)
       ✓ No tearing finally on mount (5604 ms)
     Level 2
       ✓ No tearing temporarily on update (14539 ms)
       ✕ No tearing temporarily on mount (5482 ms)
 simplux
   With useTransition
     Level 1
       ✓ No tearing finally on update (4534 ms)
       ✓ No tearing finally on mount (9382 ms)
     Level 2
       ✓ No tearing temporarily on update (8572 ms)
       ✓ No tearing temporarily on mount (9307 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3592 ms)
       ✕ Can branch state (wip state) (10115 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9563 ms)
       ✓ No tearing finally on mount (5568 ms)
     Level 2
       ✓ No tearing temporarily on update (14570 ms)
       ✓ No tearing temporarily on mount (5500 ms)

```
</details>

<table>
<tr><th>Test</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th></tr>
	<tr>
		<th><a href="https://github.com/byte-fe/react-model">react-model</a> (w/ useModel)</th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://react-redux.js.org">react-redux</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/pmndrs/zustand">zustand</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://react-tracked.js.org">react-tracked</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/diegohaz/constate">constate</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/dai-shi/react-hooks-global-state">react-hooks-global-state</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/dai-shi/use-context-selector">use-context-selector</a> (w/ useReducer)</th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/facebook/react/tree/master/packages/use-subscription">use-subscription</a> (w/ redux)</th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/apollographql/apollo-client">apollo-client</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://recoiljs.org">recoil</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/pmndrs/jotai">jotai</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/pmndrs/jotai">jotai (experimental versioned write)</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/dai-shi/use-atom">use-atom</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/pmndrs/valtio">valtio</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/zerobias/effector">effector</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
	</tr>
	<tr>
		<th><a href="https://react-rxjs.org">react-rxjs</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/MrWolfZ/simplux">simplux</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>

</table>

## Caveats

- Tearing and state branching may not be an issue depending on app requirements.
- The test is done in a very limited way.
  - Passing tests don't guarantee anything.
- The results may not be accurate.
  - Do not fully trust the results.

## If you are interested

The reason why I created this is to test my projects.

- [react-tracked](https://github.com/dai-shi/react-tracked)
- [use-context-selector](https://github.com/dai-shi/use-context-selector)
- and so on

## Contributing

This repository is a tool for us to test some of global state libraries.
While it is totally fine to use the tool for other libraries under the license,
we don't generally accept adding a new library to the repository.

However, we are interested in various approaches.
If you have any suggestions feel free to open issues or pull requests.
We may consider adding (and removing) libraries.
Questions and discussions are also welcome in issues.

For listing global state libraries, we have another repository
https://github.com/dai-shi/lets-compare-global-state-with-react-hooks
in which we accept contributions. It's recommended to run this tool
and we put the result there, possibly a reference link to a PR
in this repository or a fork of this repository.
