"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { MdEdit, MdDelete, MdCheckCircle } from "react-icons/md";
import UpdateUserDialog from "./update-dialog";
import DeleteDialog from "./delete-dialog";
import ApprovalDialog from "./approval-dialog";

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

export interface IApprovalDialogProps {
  approvalDialogStateVisibility: IDialogState<boolean>;
  selectedItem: any;
}

interface ITableProps {
  columns: Array<{ title: string; accessorKey: string | undefined; render?: (args: { item: any; data: any }) => JSX.Element }>;
  data: Array<any>;
  enabledActions: boolean;
  deleteDialog: {
    render: (props: IDeleteDialogProps) => JSX.Element;
  };
  updateDialog: {
    render: (props: IUpdateDialogProps) => JSX.Element;
  };
  approvalDialog: {
    render: (props: IApprovalDialogProps) => JSX.Element;
  };
}

function Table({ columns, data, enabledActions, deleteDialog, updateDialog, approvalDialog }: ITableProps) {
  if (enabledActions)
    columns = [{ title: "Actions", accessorKey: undefined, render: ({ item, data }) => <>{data}</> }, ...columns];

  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [itemUpdateState, setItemUpdateState] = useState(false);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  // const [isItemDeleting, setIsItemDeleting] = useState(false);

  const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState<any>(null);

  return (
    <div className="relative flex-1">
      {isApprovalDialogOpen && (
        <ApprovalDialog>
          <approvalDialog.render
            approvalDialogStateVisibility={{ state: isApprovalDialogOpen, setStateVisibility: setIsApprovalDialogOpen }}
            selectedItem={selectedItem}
          />
        </ApprovalDialog>
      )}
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
                          className="cursor-pointer"
                          size={24}
                          onClick={() => {
                            setSelectedItem(item);
                            setIsUpdateDialogOpen(true);
                          }}
                        />
                        <MdDelete
                          className="mx-4 cursor-pointer text-red-700"
                          size={24}
                          onClick={() => {
                            setSelectedItem(item);
                            setIsDeleteDialogOpen(true);
                          }}
                        />
                        {!item.is_account_approved && (
                          <MdCheckCircle
                            className="mr-2 cursor-pointer text-green-700"
                            size={24}
                            onClick={() => {
                              setSelectedItem(item);
                              setIsApprovalDialogOpen(true);
                            }}
                          />
                        )}
                      </td>
                    )}
                    {columns.slice(enabledActions ? 1 : 0, columns.length).map(({ accessorKey, render }) => (
                      <td key={accessorKey} className="border border-stone-300 p-2 text-center">
                        {render ? (
                          render({ item, data: item[accessorKey as string] })
                        ) : (
                          <span className="inline-block max-w-[16ch] overflow-hidden text-ellipsis whitespace-nowrap text-sm">
                            {item[accessorKey as string]}
                          </span>
                        )}
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
