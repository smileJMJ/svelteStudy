import React, { useState, useEffect } from 'react';

const DropdownLayer = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [curValue, setCurValue] = useState(null);
    const [categoryName, setCategoryName] = useState('선택하세요');
    const {optionData, name} = props;
    let $dropdownLayerDom;

    let isOptionDataArray = false;

    useEffect(() => {
        
    }, []);

    useEffect(() => {
        isOptionDataArray = Array.isArray(optionData) && optionData.length > 0;
    }, [optionData]);

    useEffect(() => {
        if(curValue && isOptionDataArray) {
            const category = optionData.find(v => v.boardAlias === curValue);
            const name = category && category.categoryName;
            
            name && categoryName.set(name);

            fetchList(curValue);
        }
    }, [curvalue]);


    return (
        <div className="dropdown-wrap">
            <h1>DropdownLayer</h1>
        </div>
    );
};

export default DropdownLayer;