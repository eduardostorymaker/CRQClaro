"use client"

import useStore from '../../app/hooks/dataMenu';

export default function Test6 () {

    const { count, increment, decrement } = useStore();

    return(
        <div>
            <div>
            <h1>{count}</h1>
                <button onClick={increment}>Incrementar</button>
                <button onClick={decrement}>Decrementar</button>
            </div>
        </div>
    )
}