import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchData} from "../redux/actions/fetchData";
import {Block} from "../Block";


const Converter = () => {
    const [fromCurrency, setFromCurrency] = React.useState('UAH')
    const [toCurrency, setToCurrency] = React.useState('USD')
    const [fromPrice, setFromPrice] = React.useState(0)
    const [toPrice, setToPrice] = React.useState(1)
    const [rates, setRates] = React.useState({});
    const ratesRef = React.useRef({ });
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchData());
        onChangeToPrice(1);
        ratesRef.current = currencyData;
        console.log(currencyData);
    }, []);
    const onChangeFromPrice = (value) => {
        const price = value / ratesRef.current[fromCurrency];
        const result = price * ratesRef.current[toCurrency];
        setToPrice(result.toFixed(2));
        setFromPrice(value);
    }
    const onChangeToPrice = (value) => {
        const result = ratesRef.current[fromCurrency] / ratesRef.current[toCurrency] * value;
        setFromPrice(result.toFixed(2));
        setToPrice(value);
    }

    React.useEffect(() => {
        onChangeFromPrice(fromPrice);
    }, [fromCurrency]);
    React.useEffect(() => {
        onChangeToPrice(toPrice);
    }, [toCurrency]);

    const currencyData = useSelector((state) => {
        console.log(state)
        const {fetchReducer} = state;
        return fetchReducer.data[0];
    });

console.log(currencyData);
    return (
        <div className="App">
            <Block
                value={fromPrice}
                currency={fromCurrency}
                onChangeCurrency={(cur) => setFromCurrency(cur)}
                onChangeValue={onChangeFromPrice}
            />
            <Block
                value={toPrice}
                currency={toCurrency}
                onChangeCurrency={(cur) => setToCurrency(cur)}
                onChangeValue={onChangeToPrice}/>
        </div>
    );
}
export default Converter
