"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import UpdateUserDialog from "./update-dialog";
import DeleteDialog from "./delete-dialog";

type IItemState<T> = {
  state: T;
  setState: Dispatch<SetStateAction<T>>;
};

type IDialogState<T> = {
  state: T;
  setStateVisibility: Dispatch<SetStateAction<T>>;
};

export interface IDeleteDialogProps {
  deleteDialogStateVisibility: IDialogState<boolean>;
  selectedItem: any;
}

export interface IUpdateDialogProps {
  selectedItem: any;
  updateDialogStateVisibility: IDialogState<boolean>;
  itemUpdateState: IItemState<boolean>;
}

interface ITableProps {
  columns: Array<{ title: string; accessorKey: string | undefined }>;
  data: Array<any>;
  enabledActions: boolean;
  deleteDialog: {
    render: (props: IDeleteDialogProps) => JSX.Element;
  };
  updateDialog: {
    render: (props: IUpdateDialogProps) => JSX.Element;
  };
}

function Table({ columns, data, enabledActions, deleteDialog, updateDialog }: ITableProps) {
  if (enabledActions) columns = [{ title: "Actions", accessorKey: undefined }, ...columns];

  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [itemUpdateState, setItemUpdateState] = useState(false);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isItemDeleting, setIsItemDeleting] = useState(false);

  const [selectedItem, setSelectedItem] = useState<any>(null);

  return (
    <div className="relative w-full flex-1">
      {isDeleteDialogOpen && (
        <DeleteDialog>
          <deleteDialog.render
            deleteDialogStateVisibility={{ state: isDeleteDialogOpen, setStateVisibility: setIsDeleteDialogOpen }}
            selectedItem={selectedItem}
          />
        </DeleteDialog>
      )}
      {isUpdateDialogOpen && (
        <UpdateUserDialog>
          <updateDialog.render
            selectedItem={selectedItem}
            itemUpdateState={{ setState: setItemUpdateState, state: itemUpdateState }}
            updateDialogStateVisibility={{ state: isUpdateDialogOpen, setStateVisibility: setIsUpdateDialogOpen }}
          />
        </UpdateUserDialog>
      )}
      <table className="w-full">
        <thead className="bg-black text-white">
          <tr>
            {columns.map((e, i) => (
              <th className="py-2" key={i}>
                {e.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length <= 0
            ? null
            : data.map((item, i) => {
                return (
                  <tr key={i}>
                    {enabledActions && (
                      <td className="my-2 flex h-full justify-center">
                        <MdEdit
                          className="mr-2 cursor-pointer"
                          size={24}
                          onClick={() => {
                            setSelectedItem(item);
                            setIsUpdateDialogOpen(true);
                          }}
                        />
                        <MdDelete
                          className="ml-2 cursor-pointer text-red-700"
                          size={24}
                          onClick={() => {
                            setSelectedItem(item);
                            setIsDeleteDialogOpen(true);
                          }}
                        />
                      </td>
                    )}
                    {columns.slice(1, columns.length).map(({ accessorKey }) => (
                      <td key={accessorKey} className="py-3 text-center">
                        {item[accessorKey as string]}
                      </td>
                    ))}
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
}
export default Table;
