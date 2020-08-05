import React, { useState } from 'react'
import { Card, List } from 'antd'

import { EditOutlined } from '@ant-design/icons'
import UpdateInstrument from '../forms/UpdateInstrument'
import RemoveInstrument from '../buttons/RemoveInstrument'

const getStyles = () => ({
    card: {
        width: '500px'
    }
})

const Instrument = props => {
    const [id] = useState(props.id)
    const [year, setYear] = useState(props.year)
    const [brand, setBrand] = useState(props.brand)
    const [type, setType] = useState(props.type)
    const [price, setPrice] = useState(props.price)
    const [artistId, setArtistId] = useState(props.artistId)
    const [editMode, setEditMode] = useState(false)
    const styles = getStyles()

    const instrumentInfo = () => {
        return `year is: ${props.year}, brand is:  ${props.brand}, type is: ${props.type}, price is: ${props.price} and artistId is: ${props.artistId}`
    }

    const updateStateVariable = (variable, value) => {
        switch (variable) {
            case 'year':
                setYear(value)
                break
            case 'brand':
                setBrand(value)
                break
            case 'type':
                setType(value)
                break
            case 'price':
                setPrice(value)
                break
            case 'artistId':
                setArtistId(value)
                break
            default:
                break
        }
    }

    const handleButtonClick = () => setEditMode(!editMode)

    return (
        <List.Item key={props.id}>
            {editMode ? (
                <UpdateInstrument
                    id={id}
                    onButtonClick={handleButtonClick}
                    updateStateVariable={updateStateVariable}
                />
            ) : (
                    <Card
                        actions={[
                            <EditOutlined key='edit' onClick={handleButtonClick} />,
                            <RemoveInstrument id={id} year={year} brand={brand} type={type} price={price} artistId={artistId} />
                        ]}
                        style={styles.card}
                    >
                        {instrumentInfo()}
                    </Card>
                )}
        </List.Item>
    )
}

export default Instrument
