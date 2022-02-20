import React, { useState, useEffect, useRef } from 'react';

const DropdownLayer = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [curValue, setCurValue] = useState(null);
    const [curCategoryName, setCurCategoryName] = useState('선택하세요');
    const {optionData, name = '', setSelectedCategory} = props;
    let $ref = useRef(null);

    // Mount
    useEffect(() => {
        bodyClickEvent();
    }, []);

    // Update(re-render)
    useEffect(() => {
        console.log(`optionData: `, optionData);
    }, [optionData]);

    useEffect(() => {
        const category = optionData.find(v => v.boardAlias === curValue);
        const name = category && category.categoryName;

        if(name) {
            setCurCategoryName(name);
            typeof setSelectedCategory === 'function' && setSelectedCategory(name); // 부모의 state 변경
        }
        fetchList(curValue);
    }, [curValue]);

    // body 클릭 시 select 닫는 함수
    const bodyClickEvent = () => {
        document.body.addEventListener('click', e => {
            const $dropdownLayerDom = $ref?.current;
            if($dropdownLayerDom && !$dropdownLayerDom.contains(e.target)) {
                setIsOpen(false);
            }
        });
    };

    // 버튼 클릭 - select 펼침/닫힘
    const btnClick = e => {
        setIsOpen(!isOpen);
    };

    // 옵션 클릭 - curValue 변경, select 닫힘
    const optionClick = (e, value) => {
        setCurValue(value);
        setIsOpen(false);
    };

    // 게시판 글 호출
    const fetchList = (value) => {
        console.log(`현재 value: ${value}`);
    };


    return (
        <div id={name} className="dropdown-wrap" ref={$ref}>
            <div className="dropdown-btn">
                <button onClick={btnClick}>{curCategoryName}</button>
            </div>
            <div className={`dropdown-layer ${isOpen ? 'open' : ''}`}>
                <ul>
                    {
                        optionData.map(v => {
                            return (
                                <li 
                                    key = {v.categoryId}
                                    className={curValue === v.boardAlias ? 'active': ''}
                                    onClick={e => { optionClick(e, v.boardAlias, v.categoryName); }}>
                                    {v.categoryName}
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </div>
    );
};

export default DropdownLayer;