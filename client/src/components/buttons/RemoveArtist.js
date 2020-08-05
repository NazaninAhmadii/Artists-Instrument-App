import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useQuery } from '@apollo/react-hooks'
import { filter } from 'lodash'
import { GET_ARTISTS, REMOVE_ARTIST, REMOVE_INSTRUMENT, GET_ARTISTSINSTRUMENTS } from '../../queries'
import { DeleteOutlined } from '@ant-design/icons'

const RemoveArtist = ({ id, firstName, lastName }) => {
  const { loading, error, data } = useQuery(GET_ARTISTSINSTRUMENTS, {
    variables: { artistId: id },
  })



  const [removeArtist] = useMutation(REMOVE_ARTIST, {
    update(proxy, { data: { removeArtist } }) {
      const { artists } = proxy.readQuery({ query: GET_ARTISTS })
      proxy.writeQuery({
        query: GET_ARTISTS,
        data: {
          artists: filter(artists, c => {
            return c.id !== removeArtist.id
          })
        }
      })
    }
  })

  const [removeInstrument] = useMutation(REMOVE_INSTRUMENT)

  const handleButtonClick = () => {
    let result = window.confirm('Are you sure you want to delete this artist and all instruments?')
    if (result) {
      removeArtist({
        variables: {
          id
        },
        optimisticResponse: {
          __typename: 'Mutation',
          removeArtist: {
            __typename: 'Artist',
            id,
            firstName,
            lastName
          }
        }
      })
      // data.getInstruments.map((id, year, brand, type, price, artistId) => {
      //   removeInstrument({
      //     variables: {
      //       id
      //     },
      //     optimisticResponse: {
      //       __typename: 'Mutation',
      //       removeInstrument: {
      //         __typename: 'Instrument',
      //         id,
      //         year,
      //         brand,
      //         type,
      //         price,
      //         artistId
      //       }
      //     }
      //   })
      // })
    }
    console.log(data.getInstruments)
  }
  return (
    <DeleteOutlined
      key='delete'
      onClick={handleButtonClick}
      style={{ color: 'red' }}
    />
  )
}

export default RemoveArtist
