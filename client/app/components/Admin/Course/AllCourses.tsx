import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Button, Box, Modal } from '@mui/material'
import { AiOutlineDelete } from 'react-icons/ai'
import { FiEdit2 } from 'react-icons/fi'
import { useTheme } from 'next-themes'
import { useDeleteCourseMutation, useGetAllCoursesQuery } from '../../../../redux/features/courses/coursesApi'
import Loader from '../../Loader/Loader'
import { format } from "timeago.js";
import { styles } from '../../../styles/styles'
import toast from 'react-hot-toast'
import Link from 'next/link'

type Props = {}

const AllCourses = (props: Props) => {
  const { resolvedTheme, setTheme } = useTheme()
  const { isLoading, data, refetch } = useGetAllCoursesQuery({}, { refetchOnMountOrArgChange: true });
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [deleteCourse, { isSuccess: deleteSuccess, error: deleteError }] = useDeleteCourseMutation({});
  const handleDelete = async () => {
    const id = courseId;
    await deleteCourse(id);
  };

  useEffect(() => {
    if (deleteSuccess) {
      refetch();
      toast.success("Delete user successfully!");
      setOpen(false);
      setCourseId("");
    }
    if (deleteError) {
      if ("data" in deleteError) {
        const errorMessage = deleteError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [deleteSuccess, deleteError]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Course Name", flex: 1 },
    { field: "ratings", headerName: "Ratings", flex: 0.5 },
    { field: "purchased", headerName: "Purchased", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    { field: "updated_at", headerName: "updated At", flex: 0.5 },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Link href={`/admin/edit-course/${params.row.id}`}className="flex h-full items-center">
              <FiEdit2
                className="dark:text-white text-black"
                size={20}
              />
            </Link>
          </>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button>
              <AiOutlineDelete
                onClick={() => {
                  setCourseId(params.row.id);
                  setOpen(true);
                }}
                className="dark:text-white text-black"
                size={20}
              />
            </Button>
          </>
        );
      },
    },
  ];

  const rows: any[] = [];
  data?.data && data?.data.map((course: any) => {
    rows.push({
      id: course._id,
      name: course.name,
      ratings: course.ratings,
      purchased: course.purchased,
      created_at: format(course.createdAt),
      updated_at: format(course.updatedAt),
    })
  })

  return (
    <div className='mt-[120px]'>
      {
        isLoading ? (
          <Loader />
        ) : (
          <Box m="20px">
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
            {open && (
              <Modal
                open={open}
                onClose={() => {setOpen(!open); setCourseId("");}}
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
                    Are you sure you want to delete this course?
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

export default AllCourses