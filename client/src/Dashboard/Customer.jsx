import { Box, Text, Button, Heading, Tooltip } from "@chakra-ui/react";
import React from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import Loading from "./Loader";
import {
  deleteUserData,
  getUserData,
  updateUserData,
} from "../Redux/Admin/action";

const AdminCustomer = () => {
  const { users, isLoading } = useSelector((store) => store.AdminReducer);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteUserData(id)).then(() => {
      dispatch(getUserData);
    });
  };

  const handleUpdate = (id, role) => {
    const new_role = role === "user" ? "admin" : "user";
    dispatch(updateUserData(id, new_role)).then(() => {
      dispatch(getUserData);
    });
  };

  useEffect(() => {
    dispatch(getUserData);
  }, []);

  //   console.log(users);
  return (
    <Box>
      <Sidebar />
      <Box
        style={{
          width: "80vw",
          margin: "auto",
          marginRight: "35px",
          marginTop: "80px",
        }}
      >
        <Heading>User Login Data</Heading>
        <TableContainer
          style={{
            marginTop: "20px",
          }}
        >
          <Table variant={"striped"} colorScheme={"linkedin"}>
            {/* <TableCaption>Total Available Products</TableCaption> */}
            <Thead>
              <Tr bg={"#1A2A47"}>
                <Th color={"white"}>Sr No.</Th>
                <Th color={"white"}>First Name</Th>
                <Th color={"white"}>Last Name</Th>
                <Th color={"white"}>Role</Th>
                <Th color={"white"}>Email</Th>
                {/* <Th>Category</Th> */}

                <Th color={"white"}>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {isLoading && <Loading />}
              {!isLoading &&
                users?.map((el, i) => {
                  return (
                    <Tr
                      key={i}
                      //   colorScheme={i % 2 == 0 ? "whatsapp" : "default"}
                      //   color={i % 2 == 0 ? "white" : "default"}
                    >
                      <Td>{i + 1}</Td>

                      <Td>{el.first_name}</Td>
                      <Td>{el.last_name}</Td>
                      {/* <Td>{el.category}</Td> */}

                      <Td
                        onClick={() => handleUpdate(el._id, el.role)}
                        cursor={"pointer"}
                        text={"change"}
                      >
                        <Tooltip
                          bg={"red"}
                          label={
                            el.role === "user" ? "Make Admin" : "Make User"
                          }
                          aria-label="A tooltip"
                        >
                          {el.role}
                        </Tooltip>
                      </Td>
                      <Td>{el.email}</Td>

                      <Td>
                        <Button
                          onClick={() => handleDelete(el._id)}
                          colorScheme="red"
                          _hover={{
                            bg: "#152036",
                            color: "white",
                          }}
                        >
                          Delete
                        </Button>
                      </Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default AdminCustomer;
