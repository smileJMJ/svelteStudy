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
                    <p>
                        {selectedCategory ? `선택한 카테고리명은 ${selectedCategory}입니다.` : '카테고리를 선택하세요.'}
                    </p>
                    <DropdownLayer optionData={data} setSelectedCategory={setSelectedCategory}/>
                </>
            }
        </>
    );
};

export default App;