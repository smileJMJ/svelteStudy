import { writable, readable } from "svelte/store";

/*
    [ writable store method ]
    - set(val): argument로 받은 val 값이 현재 state와 동일하지 않으면 state 값을 value로 변경 (mutation)
    - update(state => {}): argument로 callback을 받아서 state 값을 변경할 수 있음 
    - subscribe(state => {}): state값을 변경할 수 있으며, subscribe를 제거할 수 있는 함수를 return한다.
    (ex) () => {
            subscribers.delete(subscriber);
            if (subscribers.size === 0) {
                stop();
                stop = null;
            }
        }
*/

export const categoryName = writable('선택하세요');
export const locCategoryValue = readable(null, set => {
    const value = location.search && location.search.split('categoryValue=')[1];
    const categoryValue = value && value.split('&')[0];

    categoryValue && set(categoryValue);
});