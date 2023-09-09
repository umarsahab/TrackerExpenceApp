import React from 'react';
import { Button, Table, Form, Input , Space  } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

 import { useState, useEffect } from 'react';






export default function Tracker() {
    const [form] = Form.useForm();
    const { Column } = Table;
    const [transactions, setTransactions] = useState([])
    const [type, setType] = useState(undefined)
    const [totals, setTotals] = useState({
        income: 0,
        expense: 0,
        profitLoss: 0
    })
    const [isEdit, setIsEdit] = useState(null)
   
    // const onFinish = (values) => {
    //     console.log('Success:', values);

    //     const valueObj = {
    //         ...values,
    //         type,
    //         created_at: new Date().toLocaleString()
    //     }
    //     console.log('Success:', valueObj);
    //     setTransactions([valueObj, ...transactions])

    // };
    
    const onFinish = (values) => {
        if (isEdit !== null) {

            transactions[isEdit] = {
                ...values,
                type,
                created_at: new Date().toLocaleString()
            }
            setTransactions([...transactions])
            setIsEdit(null)
        } else {
            const valueObj = {
                ...values,
                type,
                created_at: new Date().toLocaleString()
            }
            console.log(valueObj)
            setTransactions([valueObj, ...transactions])
        }
        form.resetFields()
        setType(undefined)
    };


    const edit = (record, ind) => {
        setIsEdit(ind)
        form.setFieldsValue({
            Amount: record.Amount,
            desc: record.desc
        })
        setType(record.type)
    }
   
    const deleteTransaction = (ind)=>{
        transactions.splice(ind , 1)
        setTransactions([...transactions])
    }
    useEffect(() => {
        if (transactions.length) {
            let income = 0
            let expense = 0
            transactions.forEach((data) => {
                console.log(data)
                if (data.type === 'income') {
                    income = income + parseInt(data.Amount)
                } else {
                    expense = expense + parseInt(data.Amount)
                }
            })

            setTotals({ income, expense, profitLoss: income - expense })

        }
    }, [transactions])



  


    return (
        <main
            className={`flex min-h-screen flex-col items-center p-24 bg-white`}
        >

            <h1 className='font-bold text-[50px] rounded bg-black cursor-pointer'>Expence Tracker</h1>
            <div className='flex'>
                <div
                    onClick={() => setType('income')}
                    style={{
                        borderColor: '#ccc', borderRadius: 25,
                        cursor: 'pointer', borderWidth: 1,
                        backgroundColor: type === 'income' ? 'green' : 'white',
                        color: type === 'income' ? '#fff' : '#000'
                    }} className={`px-4 py-2 m-2`}>
                    Income
                </div>

                <div style={{
                    borderColor: '#ccc', borderRadius: 25,
                    cursor: 'pointer', borderWidth: 1,
                    backgroundColor: type === 'expense' ? 'red' : 'white',
                    color: type === 'expense' ? '#fff' : '#000'
                }}
                    onClick={() => setType('expense')}
                    className={`px-4 py-2 m-2 `}>
                    Expense
                </div>
            </div>

            <div className='mt-[50px] flex min-h-screen flex-col items-center '>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    form={form}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Amount"
                        name="Amount"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Amount!',
                            },
                        ]}
                    >
                        <Input type='number' className='h-[40px] w-[300px] rounded border-slate-950	' />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="desc"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your description!',
                            },
                        ]}
                    >
                        <Input type='text' className='h-[40px] w-[300px] rounded border-slate-950	' />
                    </Form.Item>


                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button htmlType="submit">
                           {
                            isEdit !== null ? "Edit" : "Submit"
                           }
                        </Button>
                    </Form.Item>

                </Form>

                <div className='w-[700px] border-black flex'>

                    <div className='p-3' style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'center' }}>
                        <h1 className='font-bold text-[40px] text-black'>Income</h1>
                        <h1 className='font-bold text-[40px] text-green-400'>{totals.income}</h1>
                    </div>
                    <div className='p-3' style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'center' }}>
                        <h1 className='font-bold text-[40px] text-black'>Expense</h1>
                        <h1 className='font-bold text-[40px] text-red-400'>{totals.expense}</h1>
                    </div>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'center', }}>
                        <h1 className='font-bold text-[40px] text-black'>Profit Loss</h1>
                        <h1 className='font-bold text-[40px] text-red-400' style={{ color: totals.profitLoss >= 0 ? 'green' : 'red' }}>{totals.profitLoss}</h1>
                    </div>

                </div>
                <Table style={{ width: "700px" }} dataSource={transactions}  >
                <Column dataIndex={'created_at'} key={'created_at'} title='Date' />
                <Column dataIndex={'Amount'} key={'amount'} title='Amount' />
                <Column dataIndex={'desc'} key={'desc'} title='Description' />
                <Column dataIndex={'type'} key={'type'} title='Type' />
                <Column
                    title="Action"
                    key="action"
                    render={(_, record, ind) => {
                        return (
                            <Space size="middle">
                                <a onClick={() => edit(record, ind)}><EditOutlined /></a>
                                <a onClick={() => deleteTransaction(ind)}><DeleteOutlined /></a>
                            </Space>
                        )
                    }}
                />
            </Table>
            
             
       

            </div>
        </main>

    )
}