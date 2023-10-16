import React, { useContext, useEffect, useRef, useState } from 'react';
import DashboardLayout from "../../../layouts/dashboard-layout/DashboardLayout";
import styles from "./AddHistory.module.css";
import { Link, useLocation, useHistory } from "react-router-dom";
//components mui
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
//framework component
import ReactLoading from "react-loading";
import { BASE_API_URL } from "../../../helper/url";
import Modal from "react-bootstrap/esm/Modal";
import axios from "axios";
import { Select, Button, Form, Input, Popconfirm, Table } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { ToastContainer, toast } from 'react-toastify';
//image/icon
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "../../../assets/assets";
const { Option } = Select;

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};
const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);
    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };
    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({
                ...record,
                ...values,
            });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };
    let childNode = children;
    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }
    return <td {...restProps}>{childNode}</td>;
};

function AddHistory(props) {
    const [loading, setLoading] = useState(false);

    const [dataSource, setDataSource] = useState([
        // {
        //     key: '0',
        //     name: 'Edward King 0',
        //     age: '32',
        //     address: 'London, Park Lane no. 0',
        // },
        // {
        //     key: '1',
        //     name: 'Edward King 1',
        //     age: '32',
        //     address: 'London, Park Lane no. 1',
        // },
    ]);
    const [count, setCount] = useState(2);
    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };
    const defaultColumns = [
        // {
        //     title: 'Duration',
        //     dataIndex: 'name',
        //     width: '30%',
        //     editable: true,
        // },
        {
            title: 'Time',
            dataIndex: 'age',
            editable: true,
        },
        {
            title: 'Status',
            dataIndex: 'address',
            editable: true,
        },
        {
            title: 'Aksi',
            dataIndex: 'operation',
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                        <a>Delete</a>
                    </Popconfirm>
                ) : null,
        },
    ];
    const handleAdd = () => {
        const newData = {
            key: count,
            // name: 'Add Duration',
            age: 'Add Time',
            address: `Add Status`,
        };
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    };
    const handleSave = (row) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setDataSource(newData);
    };
    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };
    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });


    const addDoctor = () => {

    };

    return (
        <DashboardLayout>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className={styles.wrapper}>
                <div className={styles.topWrapper}>
                    <h2 className={styles.pageTitle}>Tambah Record</h2>
                    <Breadcrumbs aria-label="breadcrumb" className={styles.breadcumbs}>
                        <Link className={styles.breadActive} to="/dashboard">
                            Home
                        </Link>
                        <Link className={styles.breadActive} to="/history">
                            History
                        </Link>
                        <Typography className={styles.breadUnactive} color="text.primary">
                            Tambah Record
                        </Typography>
                    </Breadcrumbs>
                </div>
                <div className={styles.content}>
                    <h4 className={styles.addAdminTitle}>Tambahkan Record Baru</h4>
                    <div className={styles.form}>
                        <div>
                            <Button
                                onClick={handleAdd}
                                type="primary"
                                style={{
                                    marginBottom: 16,
                                    backgroundColor: "#cd1111",
                                    border: "none",
                                }}
                            >
                                Tambahkan Data
                            </Button>
                            <Table
                                components={components}
                                rowClassName={() => 'editable-row'}
                                bordered
                                dataSource={dataSource}
                                columns={columns}
                                pagination={false}
                            />
                        </div>
                        {/* <div className={styles.msgPwError}>halo</div> */}
                        <div className={styles.btnBox}>
                            {loading ? (
                                <button className={styles.btnAdd}>
                                    <ReactLoading className={styles.loadingConfirm} type={props.balls} color={props.color} height={20} width={30} />
                                </button>
                            ) : (
                                <button className={styles.btnAdd} onClick={addDoctor}>
                                    Tambah Record
                                </button>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </DashboardLayout>
    );
}

export default AddHistory;
