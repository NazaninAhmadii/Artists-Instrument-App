import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_ARTISTSINSTRUMENTS } from '../../queries'

import { List } from 'antd'

import Instrument from '../listItems/Instrument'

const getStyles = () => ({
    list: {
        display: 'flex',
        justifyContent: 'center'
    }
})

const Instruments = (props) => {
    const styles = getStyles()

    const { loading, error, data } = useQuery(GET_ARTISTSINSTRUMENTS, {
        variables: { artistId: props.artistId },
    })
    if (loading) return 'Loading...'
    if (error) return `Errror! ${error.message}`
    return (
        <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
            {data.getInstruments.map(({ id, year, brand, type, price, artistId }) => (
                <List.Item key={id}>
                    <Instrument id={id} year={year} brand={brand} type={type} price={price} artistId={artistId} />
                </List.Item>
            ))}
        </List>
    )
}

export default Instruments
