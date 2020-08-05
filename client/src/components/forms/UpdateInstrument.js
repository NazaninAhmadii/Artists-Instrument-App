import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Form, Input, Button } from 'antd'
import { UPDATE_INSTRUMENT } from '../../queries'

const UpdateInstrument = props => {
    const [id] = useState(props.id)
    const [year, setYear] = useState(props.year)
    const [brand, setBrand] = useState(props.brand)
    const [type, setType] = useState(props.type)
    const [price, setPrice] = useState(props.price)
    const [artistId, setArtistId] = useState(props.artistId)
    const [updateInstrument] = useMutation(UPDATE_INSTRUMENT)

    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    useEffect(() => {
        forceUpdate({})
    }, [])

    const onFinish = values => {
        const { year, brand, type, price, artistId } = values
        updateInstrument({
            variables: {
                id,
                year,
                brand,
                type,
                price,
                artistId
            },
            optimisticResponse: {
                __typename: 'Mutation',
                updateInstrument: {
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
        props.onButtonClick()
    }

    const updateStateVariable = (variable, value) => {
        switch (variable) {
            case 'year':
                props.updateStateVariable('year', value)
                setYear(value)
                break
            case 'brand':
                props.updateStateVariable('brand', value)
                setBrand(value)
                break
            case 'type':
                props.updateStateVariable('type', value)
                setType(value)
                break
            case 'price':
                props.updateStateVariable('price', value)
                setPrice(value)
                break
            case 'artistId':
                props.updateStateVariable('artistId', value)
                setArtistId(value)
                break
            default:
                break
        }
    }



    return (
        <Form
            form={form}
            name='update-artist-form'
            layout='inline'
            onFinish={onFinish}
            initialValues={{
                year: year,
                brand: brand,
                type: type,
                price: price,
                artistId: artistId
            }}
            size='large'
        >
            <Form.Item
                name='year'
                label='year'
                rules={[{ required: true, message: 'Please input year!' }]}
            >
                <Input
                    placeholder='i.e. 1970'
                    onChange={e => updateStateVariable('year', e.target.value)}
                />
            </Form.Item>
            <Form.Item
                name='brand'
                label='brand'
                rules={[{ required: true, message: 'Please input brand!' }]}
            >
                <Input
                    placeholder='i.e. Yahama'
                    onChange={e => updateStateVariable('brand', e.target.value)}
                />
            </Form.Item>
            <Form.Item
                name='type'
                label='type'
                rules={[{ required: true, message: 'Please input type!' }]}
            >
                <Input
                    placeholder='i.e. keyboard'
                    onChange={e => updateStateVariable('brand', e.target.value)}
                />
            </Form.Item>
            <Form.Item
                name='price'
                label='price'
                rules={[{ required: true, message: 'Please input price!' }]}
            >
                <Input
                    placeholder='i.e. 2200'
                    onChange={e => updateStateVariable('price', e.target.value)}
                />
            </Form.Item>
            <Form.Item
                name='artistId'
                label='artistId'
                rules={[{ required: true, message: 'Please input artist Id!' }]}
            >
                <Input
                    placeholder='i.e. 1'
                    onChange={e => updateStateVariable('artistId', e.target.value)}
                />
            </Form.Item>

            <Form.Item shouldUpdate={true}>
                {() => (
                    <Button
                        type='primary'
                        htmlType='submit'
                        disabled={
                            !form.isFieldsTouched(true) ||
                            form.getFieldsError().filter(({ errors }) => errors.length).length
                        }
                    >
                        Update Instrument
                    </Button>
                )}
            </Form.Item>
            <Button onClick={props.onButtonClick}>Cancel</Button>
        </Form>
    )
}

export default UpdateInstrument
