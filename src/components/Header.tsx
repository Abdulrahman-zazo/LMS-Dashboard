// import { useDispatch } from "react-redux";

// import { useAppSelector } from "../app/store";
// import { collapsedAction } from "../app/features/uiSlice/uiSlice";
// import { LogoutHandler } from "./LogoutHandler";
// import { useGetuserInformationQuery } from "../app/features/User/userApi";
// import { cookieService } from "../Cookies/CookiesServices";

// const HeaderDashbord = () => {
//   const dispatch = useDispatch();
//   const { uiSlice } = useAppSelector((state) => state);
//   const token = cookieService.get("auth_token");
//   console.log(token);

//   const { data } = useGetuserInformationQuery(`${token}`);
//   console.log(data?.User);

//   return (
//     <>
//       <Header style={{ padding: 0, background: "#fff" }}>
//         <div className="flex justify-between m-auto px-4 ">
//           <Button
//             type="text"
//             icon={
//               uiSlice.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
//             }
//             onClick={() => dispatch(collapsedAction())}
//             style={{
//               fontSize: "16px",
//               width: 64,
//               height: 64,
//             }}
//           />
//           <div className="flex justify-center items-center gap-4">
//             <button
//               type="button"
//               className=" bg-neutral-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 "
//               onClick={() => LogoutHandler()}
//             >
//               <LogoutOutlined />
//             </button>
//             <button
//               type="button"
//               className=" bg-neutral-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 "
//             >
//               <NotificationOutlined />
//             </button>
//             <div className="flex justify-center items-center gap-4">
//               {/* <img
//               src={data?.User.image_url}
//               alt={data?.User.first_name}
//               className="w-[25px] h-[25px] rounded-full object-cover"
//             /> */}
//               <p>
//                 {data?.User.first_name} {data?.User.last_name}
//               </p>
//               <div className="w-[30px] h-[30px] rounded-full object-cover bg-primary" />
//             </div>
//           </div>
//         </div>
//       </Header>
//     </>
//   );
// };

// export default HeaderDashbord;
