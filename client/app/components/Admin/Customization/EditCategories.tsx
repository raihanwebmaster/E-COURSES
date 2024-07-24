import React, { useEffect, useState } from 'react'
import { useEditLayoutsMutation, useGetLayoutQuery } from '../../../../redux/features/layouts/layoutsApi';
import { styles } from '../../../styles/styles';
import { AiOutlineDelete } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { ImSpinner2 } from 'react-icons/im';

type Props = {}

const EditCategories = (props: Props) => {
  const { data, refetch } = useGetLayoutQuery("Categories", { refetchOnMountOrArgChange: true });
  const [editLayouts, { isLoading: editLoading, isSuccess, error }] = useEditLayoutsMutation()
  const [categories, setCategories] = useState<any[]>([]);
  useEffect(() => {
    if (data) {
      setCategories(data.data.categories);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      refetch()
      toast.success("Categories Updated successfully")
    }
    if (error) {
      if ('data' in error) {
        const errorData = error as any;
        toast.error(errorData.data.message)
      }
    }
  }, [isSuccess, error])
  const handleCategoriesAdd = (prevIndex: number, value: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((item, index) =>
        index === prevIndex ? { ...item, title: value } : item
      )
    );
  }
  const newCategoriesHandler = () => {
    if (categories.length === 0 || categories[categories.length - 1].title !== "") {
      setCategories((prevCategory: any) => [...prevCategory, { title: "" }]);
    } else {
      toast.error("Category title cannot be empty");
    }
  }
  const areCategoriesUnchanged = (oldCategories: any[], newCategories: any[]) => {
    return JSON.stringify(oldCategories) === JSON.stringify(newCategories)
  }
  const isAnyCategoryTitleEmpty = (categories: any[]) => {
    return categories.some((item) => item.title === "")
  }
  const editCategoriesHandler = () => {
    editLayouts({
      type: "Categories",
      categories: categories
    });
  }
  return (
    <div className='mt-[120px] text-center ' >
      <h1 className={`${styles.title}`} >All Categories</h1>
      {categories &&
        categories.map((item: any, index: number) => {
          return (
            <div className="p-3" key={index}>
              <div className="flex items-center w-full justify-center">
                <input
                  className={`${styles.input} !w-[unset] !border-none !text-[20px]`}
                  value={item.title}
                  onChange={(e) =>
                    handleCategoriesAdd(index, e.target.value)
                  }
                  placeholder="Enter category title..."
                />
                <AiOutlineDelete
                  className="dark:text-white text-black text-[18px] cursor-pointer"
                  onClick={() => {
                    setCategories((prevCategory: any) =>
                      prevCategory.filter((_: any, i: number) => i !== index)
                    );
                  }}
                />
              </div>
            </div>
          );
        })}
      <br />
      <br />
      <div className="w-full flex justify-center">
        <IoMdAddCircleOutline
          className="dark:text-white text-black text-[25px] cursor-pointer"
          onClick={newCategoriesHandler}
        />
      </div>
      <div className={`${styles.button
        } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] ${areCategoriesUnchanged(data?.data?.categories, categories) || isAnyCategoryTitleEmpty(categories)
          ? "!cursor-not-allowed"
          : "!cursor-pointer !bg-[#42d383]"
        } !rounded absolute bottom-12 right-[7rem]`}
        onClick={
          areCategoriesUnchanged(data?.data.categories, categories) || isAnyCategoryTitleEmpty(categories)
            ? () => { }
            : editCategoriesHandler
        }
      >
        {editLoading ? (
          <ImSpinner2 className="animate-spin text-white" size={24} />
        ) : (
          "Save"
        )}
      </div>

    </div>
  )
}

export default EditCategories