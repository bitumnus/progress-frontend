import React, {useEffect, useState} from "react";
import Section from "../Section";
import axios from "axios";

export default function ContainerList({checkList, setFanFact}) {
    const [checked, setChecked] = useState([]);

    const handleCheck = async (event) => {
        let updatedList = [...checked];
        const [section, element] = event.target.value.split('_');
        if (event.target.checked) {
            updatedList[+section].options[+element] = event.target.checked;
        } else {
            updatedList = [...setUnchecked(+section, updatedList)];
        }
        updatedList[+section].options[+element] = event.target.checked
        const lastSection = +section === updatedList.length - 1;
        if (!lastSection) {
            updatedList[+section+1].disabled = updatedList[+section].options.every(elem => elem === true);
        } else {
            const allCheck = updatedList[+section].options.every(elem => elem === true)
            if (allCheck) await showFanFact();
        }

        setChecked(updatedList);
        localStorage.setItem('checkedList', JSON.stringify(updatedList));
    };

    const setUnchecked = (section, list) => {
        setFanFact('');
        for (let i = section + 1; i < list.length; i++) {
            list[i].options.fill(false);
        }
        return list;
    }

    const showFanFact = async () => {
        const response = await axios.get('http://localhost:3000/api/v1/getRandom');
        setFanFact(response.data);
    }

    useEffect(() => {
        const checkedListFromStore = localStorage.getItem('checkedList');
        if (checkedListFromStore) {
            return setChecked(JSON.parse(checkedListFromStore));
        }
        const checkedItemList = checkList.sort((a, b) => a.sort - b.sort).map((item, key) => {
            const options = item.options.map(i => { return i.checked });
            const disabled = key === 0;
            return {options, disabled}
        });
        setChecked(checkedItemList);
        localStorage.setItem('checkedList', JSON.stringify(checkedItemList));
    }, [checkList])

    return (
        <div>
            {checkList
                .sort((a, b) => a.sort - b.sort)
                .map((item, index) => (
                    checked.length && <Section
                        key={index}
                        section={item}
                        index={index}
                        handleChange={handleCheck}
                        checkedList={checked[index]}
                    />
                ))}
        </div>
    )
}
