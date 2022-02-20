import React, { useState, useEffect } from 'react';
import DropdownLayer from './component/DropdownLayer';

const App = () => {
    const [data, setData] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Mount
    useEffect(() => {
        fetch('http://localhost:8081/data')
		.then(res => res.json())
		.then(res => setData(res));
    }, []);

    return (
        <>
            {
                Array.isArray(data) && data.length > 0 && 
                <>
                    {
                        selectedCategory ? 
                        <p>선택한 카테고리명은 <strong>{selectedCategory}</strong>입니다.</p>
                        : <p>카테고리를 선택하세요.</p>
                    }
                    <DropdownLayer optionData={data} setSelectedCategory={setSelectedCategory}/>
                </>
            }
        </>
    );
};

export default App;