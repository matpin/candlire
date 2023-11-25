import axios from "axios";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./MyOrders.css";
import { Link } from "react-router-dom";

// Requirements for MUI accordion
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

function MyOrders() {
  let token = localStorage.getItem("token");
  const [orderList, setOrderList] = useState([]);

  // Changes the date that get from database to yyyy/mm/dd
  function formatDate(createdAtString) {
    const dateObject = new Date(createdAtString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  }

  // Gets orders from database
  async function getMyOrders() {
    try {
      await axios
        .get(`http://localhost:8000/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setOrderList(res.data);
        });
    } catch (error) {}
  }

  useEffect(() => {
    getMyOrders();
  }, []);

  return (
    <div className="myOrderContainer">
      {orderList.length !== 0 ? (
        <div>
          {orderList.map((o) => (
            <Accordion
              key={o._id}
              expandicon={<ExpandMoreIcon />}
              style={{ marginBottom: "2em", border: 0 }}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <TableContainer component={Paper} sx={{ width: "100%" }}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          style={{
                            fontFamily: "Lora",
                            fontWeight: "bold",
                            fontSize: "1em",
                          }}
                        >
                          Date
                        </TableCell>
                        <TableCell
                          style={{
                            fontFamily: "Lora",
                            fontWeight: "bold",
                            fontSize: "1em",
                          }}
                          align="right"
                        >
                          Order ID
                        </TableCell>
                        <TableCell
                          style={{
                            fontFamily: "Lora",
                            fontWeight: "bold",
                            fontSize: "1em",
                          }}
                          align="right"
                        >
                          Delivery Status
                        </TableCell>
                        <TableCell
                          style={{
                            fontFamily: "Lora",
                            fontWeight: "bold",
                            fontSize: "1em",
                          }}
                          align="right"
                        >
                          Total
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          style={{ fontFamily: "Lora" }}
                          component="th"
                          scope="o"
                        >
                          {formatDate(o.createdAt)}
                        </TableCell>
                        <TableCell style={{ fontFamily: "Lora" }} align="right">
                          {o._id}
                        </TableCell>
                        <TableCell style={{ fontFamily: "Lora" }} align="right">
                          {o.delivery_status.charAt(0).toUpperCase() +
                            o.delivery_status.slice(1)}
                        </TableCell>
                        <TableCell style={{ fontFamily: "Lora" }} align="right">
                          {(o.total / 100).toFixed(2)} €
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionSummary>
              <AccordionDetails>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography
                      style={{
                        fontFamily: "Lora",
                        fontWeight: "bold",
                        fontSize: "1em",
                      }}
                    >
                      Order: {o._id}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="ordersAddressContainer">
                        <p className="ordersHead">Address:</p>
                        <div className="ordersAddressDetails">
                        <p>{o.shipping.address.line1},</p>
                        <p>{o.shipping.address.city},</p>
                        {o.shipping.address.line2 !== null ? (
                          <p>{o.shipping.address.line2},</p>
                        ) : (
                          ""
                        )}
                        <p>{o.shipping.address.postal_code},</p>
                        <p>{o.shipping.address.country}</p>
                      </div>
                    </div>
                    <TableContainer component={Paper} sx={{ width: "100%" }}>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell
                              style={{
                                fontFamily: "Lora",
                                fontWeight: "bold",
                                fontSize: "1em",
                              }}
                            >
                              Product Name
                            </TableCell>
                            <TableCell
                              style={{
                                fontFamily: "Lora",
                                fontWeight: "bold",
                                fontSize: "1em",
                              }}
                              align="right"
                            >
                              Price
                            </TableCell>
                            <TableCell
                              style={{
                                fontFamily: "Lora",
                                fontWeight: "bold",
                                fontSize: "1em",
                              }}
                              align="right"
                            >
                              Discount
                            </TableCell>
                            <TableCell
                              style={{
                                fontFamily: "Lora",
                                fontWeight: "bold",
                                fontSize: "1em",
                              }}
                              align="right"
                            >
                              Quantity
                            </TableCell>
                            <TableCell
                              style={{
                                fontFamily: "Lora",
                                fontWeight: "bold",
                                fontSize: "1em",
                              }}
                              align="right"
                            >
                              Payment Status
                            </TableCell>
                            <TableCell
                              style={{
                                fontFamily: "Lora",
                                fontWeight: "bold",
                                fontSize: "1em",
                              }}
                              align="right"
                            >
                              Subtotal
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        {o.products.map((p) => (
                          <TableBody key={p._id}>
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell
                                style={{ fontFamily: "Lora" }}
                                component="th"
                                scope="o"
                              >
                                <Link
                                  className="ordersNameLink"
                                  to={`/product/${p.productId}`}
                                >
                                  {p.productName}
                                </Link>
                              </TableCell>
                              <TableCell
                                style={{ fontFamily: "Lora" }}
                                align="right"
                              >
                                {p.productPrice} €
                              </TableCell>
                              <TableCell
                                style={{ fontFamily: "Lora" }}
                                align="right"
                              >
                                {o.total_discount > 0 ? (<>-{(o.total_discount / 100).toFixed(2)} €</>) : (<>-</>)}
                              </TableCell>
                              <TableCell
                                style={{ fontFamily: "Lora" }}
                                align="right"
                              >
                                {p.quantity}
                              </TableCell>
                              <TableCell
                                style={{ fontFamily: "Lora" }}
                                align="right"
                              >
                                {o.payment_status.charAt(0).toUpperCase() +
                            o.payment_status.slice(1)}
                              </TableCell>
                              <TableCell
                                style={{ fontFamily: "Lora" }}
                                align="right"
                              >
                                {o.total_discount > 0 ? (<>{(p.productPrice * p.quantity) - (o.total_discount / 100).toFixed(2)} €</>) : (<>{p.productPrice * p.quantity} €</>)}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        ))}
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      ) : (
        <p className="noOrdersYet">No orders yet.</p>
      )}
    </div>
  );
}

export default MyOrders;
