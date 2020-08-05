import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { filter } from 'lodash'
import { GET_ARTISTSINSTRUMENTS, REMOVE_INSTRUMENT } from '../../queries'
import { DeleteOutlined } from '@ant-design/icons'

const RemoveInstrument = ({ id, year, brand, type, price, artistId }) => {
    const [removeInstrument] = useMutation(REMOVE_INSTRUMENT, {
        update(proxy, { data: { removeInstrument } }) {
            const { instruments } = proxy.readQuery({
                query: GET_ARTISTSINSTRUMENTS,
                variables: { artistId: artistId }
            })
            proxy.writeQuery({
                query: GET_ARTISTSINSTRUMENTS,
                variables: { artistId: artistId },
                data: {
                    getInstruments: filter(instruments, c => {
                        return c.id !== removeInstrument.id
                    })
                }
            })
        }
    })

    const handleButtonClick = () => {
        let result = window.confirm('Are you sure you want to delete this instrument?')
        if (result) {
            removeInstrument({
                variables: {
                    id
                },
                optimisticResponse: {
                    __typename: 'Mutation',
                    removeInstrument: {
                        __typename: 'Instrument',
                        id,
                        year,
                        brand,
                        type,
                        price,
                        artistId
                    }
                }
            })
        }
    }

    return (
        <DeleteOutlined
            key='delete'
            onClick={handleButtonClick}
            style={{ color: 'red' }}
        />
    )
}

export default RemoveInstrument
