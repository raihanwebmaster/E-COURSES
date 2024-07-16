"use client"
import React, { FC, useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Button, Box, Modal } from '@mui/material'
import { AiOutlineDelete, AiOutlineMail } from 'react-icons/ai'
import Loader from '../../Loader/Loader'
import { format } from "timeago.js";
import { useDeleteUserMutation, useGetAllUsersQuery, useUpdateUserRoleMutation } from '@/redux/features/user/userApi'
import { useTheme } from 'next-themes'
import { styles } from '@/app/styles/styles'
import toast from 'react-hot-toast'

type Props = {
  isTeam: boolean
}

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { resolvedTheme } = useTheme()
  const [active, setActive] = useState(false)
  const { isLoading, data, refetch } = useGetAllUsersQuery({}, { refetchOnMountOrArgChange: true })
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [updateUserRole, { error: updateError, isSuccess }] = useUpdateUserRoleMutation();
  const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] = useDeleteUserMutation({});
  const handleDelete = async () => {
    const id = userId;
    await deleteUser(id);
  };
  const handleSubmit = async () => {
    await updateUserRole({ email, role });
  };

  useEffect(() => {
    if (updateError) {
      if ("data" in updateError) {
        const errorMessage = updateError as any;
        toast.error(errorMessage.data.message);
      }
    }

    if (isSuccess) {
      refetch();
      toast.success("User role updated successfully");
      setActive(false);
      setEmail("");
      setRole("admin");
    }
    if (deleteSuccess) {
      refetch();
      toast.success("Delete user successfully!");
      setOpen(false);
      setUserId("");
    }
    if (deleteError) {
      if ("data" in deleteError) {
        const errorMessage = deleteError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [updateError, isSuccess, deleteSuccess, deleteError]);


  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 0.3 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.4 },
    { field: "courses", headerName: "Purchased Courses", flex: 0.4 },
    { field: "created_at", headerName: "Joined At", flex: 0.5 },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button onClick={() => {
              setOpen(!open);
              setUserId(params.row.id);
            }}>
              <AiOutlineDelete
                className="dark:text-white text-black"
                size={20}
              />
            </Button>
          </>
        );
      },
    },
    {
      field: "sendMail",
      headerName: "Email",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <a href={`mailto:${params.row.email}`} className="flex items-center h-full" >
              <AiOutlineMail
                className="dark:text-white text-black"
                size={20}
              />
            </a>
          </>
        );
      },
    },
  ];

  const rows: any[] = [];
  data?.data && data?.data.forEach((user: any) => {
    if (!isTeam || (isTeam && user.role === 'admin')) {
      rows.push({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        courses: user.courses.length,
        created_at: format(user.createdAt),
      });
    }
  });

  return (
    <div className='mt-[120px]'>
      {
        isLoading ? (
          <Loader />
        ) : (
          <Box m="20px">
            <div className="w-[95%] flex justify-end cursor-pointer" onClick={() => setActive(!active)}>
              <div className={`${styles.button} !w-[250px] !h-[35px] dark:bg-[#57c7a3] dark:border-[#ffffff6c]`} >
                Add New Member
              </div>
            </div>
            <Box
              m="40px 0 0 0"
              height="80vh"
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                  outline: "none",
                },
                "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                  color: resolvedTheme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-sortIcon": {
                  color: resolvedTheme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-row": {
                  color: resolvedTheme === "dark" ? "#fff" : "#000",
                  borderBottom:
                    resolvedTheme === "dark"
                      ? "1px solid #ffffff30!important"
                      : "1px solid #ccc!important",
                },
                "& .MuiTablePagination-root": {
                  color: resolvedTheme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none!important",
                  "&:focus": {
                    outline: "none !important",
                  },
                  "&:focus-within": {
                    outline: "none !important",
                  },
                },
                "& .name-column--cell": {
                  color: resolvedTheme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-columnHeader": {
                  backgroundColor: resolvedTheme === "dark" ? "#3e4396" : "#A4A9FC",
                  borderBottom: "none",
                  color: resolvedTheme === "dark" ? "#fff" : "#000",
                  "&:focus": {
                    outline: "none !important",
                  },
                  "&:focus-within": {
                    outline: "none !important",
                  },
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: resolvedTheme === "dark" ? "#1F2A40" : "#F2F0F0",
                },
                "& .MuiDataGrid-footerContainer": {
                  color: resolvedTheme === "dark" ? "#fff" : "#000",
                  borderTop: "none",
                  backgroundColor: resolvedTheme === "dark" ? "#3e4396" : "#A4A9FC",
                },
                "& .MuiCheckbox-root": {
                  color:
                    resolvedTheme === "dark" ? `#b7ebde !important` : `#000 !important`,
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: `#fff !important`,
                },
              }}
            >
              <DataGrid columns={columns} rows={rows} />
            </Box>
            {active && (
              <Modal
                open={active}
                onClose={() =>{ setActive(!active);
                    setEmail("");
                  setRole("admin");}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableScrollLock
                sx={{
                  "&.MuiModal-root": {
                    zIndex: "2147483647!important",
                  },
                }}
              >
                <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                  <h1 className={`${styles.title}`}>Add New Member</h1>
                  <div className="mt-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email..."
                      className={`${styles.input}`}
                    />
                    <select
                      name=""
                      id=""
                      className={`${styles.input} !mt-6`}
                      onChange={(e: any) => setRole(e.target.value)}
                    >
                      <option
                        className="dark:bg-[#000] text-[#fff]"
                        value="admin"
                      >
                        Admin
                      </option>
                      <option className="dark:bg-[#000] text-[#fff]" value="user">
                        User
                      </option>
                    </select>
                    <br />
                    <div
                      className={`${styles.button} my-6 !h-[30px] cursor-pointer`}
                      onClick={handleSubmit}
                    >
                      Submit
                    </div>
                  </div>
                </Box>
              </Modal>
            )}
            {open && (
              <Modal
                open={open}
                onClose={() => {setOpen(!open); setUserId("");}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableScrollLock
                sx={{
                  "&.MuiModal-root": {
                    zIndex: "2147483647!important",
                  },
                }}
              >
                <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                  <h1 className={`${styles.title}`}>
                    Are you sure you want to delete this user?
                  </h1>
                  <div className="flex w-full items-center justify-between mb-6 mt-4">
                    <div
                      className={`${styles.button} !w-[120px] h-[30px] bg-[#57c7a3] cursor-pointer`}
                      onClick={() => setOpen(!open)}
                    >
                      Cancel
                    </div>
                    <div
                      className={`${styles.button} !w-[120px] h-[30px] bg-[#d63f3f] cursor-pointer`}
                      onClick={handleDelete}
                    >
                      Delete
                    </div>
                  </div>
                </Box>
              </Modal>
            )}
          </Box>
        )
      }
    </div>
  )
}

export default AllUsers