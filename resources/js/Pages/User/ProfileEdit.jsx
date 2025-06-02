// import React, { useState } from "react";
// import {
//   TextInput,
//   Button,
//   Stack,
//   Container,
//   Title,
//   Group,
//   PasswordInput,
//   Image,
//   FileInput,
// } from "@mantine/core";
// import { useForm, usePage, router } from "@inertiajs/react";

// function ProfileEdit() {
//   const { user } = usePage().props;
//   const [pictureFile, setPictureFile] = useState(null);
//   const [uploadingImage, setUploadingImage] = useState(false);

//   const { data, setData, post, processing, errors } = useForm({
//     username: user.username || "",
//     first_name: user.first_name || "",
//     last_name: user.last_name || "",
//     email: user.email || "",
//     phone_number: user.phone_number || "",
//     address_id: user.address_id || "",
//     password: "",
//     password_confirmation: "",
//     current_password: "",
//   });

//   const handleImageChange = (file) => {
//     if (!file) return;

//     console.log("Image selected for upload:", file.name);

//     const allowedTypes = [
//       "image/jpeg",
//       "image/png",
//       "image/jpg",
//       "image/webp",
//     ];

//     if (!allowedTypes.includes(file.type)) {
//       alert("Please upload a valid image file (jpg, png, webp).");
//       return;
//     }

//     setUploadingImage(true);
//     setPictureFile(file);
//     setTimeout(() => {
//       setUploadingImage(false);
//     }, 500); // simulate image load
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     for (const key in data) {
//       formData.append(key, data[key]);
//     }
//     if (pictureFile) {
//       formData.append("picture", pictureFile);
//     }

//     router.post("/profile/update", formData, {
//       forceFormData: true,
//       onSuccess: () => {
//         setPictureFile(null);
//       },
//     });
//   };

//   return (
//     <Container size="sm">
//       <Title order={2} mb="md">
//         Edit Profile
//       </Title>
//       <form onSubmit={handleSubmit}>
//         <Stack spacing="sm">
//           <TextInput
//             label="Username"
//             value={data.username}
//             onChange={(e) => setData("username", e.target.value)}
//             error={errors.username}
//             required
//           />
//           <TextInput
//             label="First Name"
//             value={data.first_name}
//             onChange={(e) => setData("first_name", e.target.value)}
//             error={errors.first_name}
//             required
//           />
//           <TextInput
//             label="Last Name"
//             value={data.last_name}
//             onChange={(e) => setData("last_name", e.target.value)}
//             error={errors.last_name}
//             required
//           />
//           <TextInput
//             label="Email"
//             type="email"
//             value={data.email}
//             onChange={(e) => setData("email", e.target.value)}
//             error={errors.email}
//             required
//           />
//           <TextInput
//             label="Phone Number"
//             value={data.phone_number}
//             onChange={(e) => setData("phone_number", e.target.value)}
//             error={errors.phone_number}
//           />
//           <TextInput
//             label="Address ID"
//             value={data.address_id}
//             onChange={(e) => setData("address_id", e.target.value)}
//             error={errors.address_id}
//           />

//           {/* File input for profile picture */}
//           <FileInput
//             label="Upload Profile Picture"
//             accept="image/jpeg,image/png,image/jpg,image/webp"
//             onChange={handleImageChange}
//             clearable
//             mb="sm"
//           />

//           {/* Profile Picture Preview */}
//           {pictureFile ? (
//             <Image
//               src={URL.createObjectURL(pictureFile)}
//               alt="Preview"
//               width={120}
//               height={120}
//               radius="xl"
//               mb="sm"
//             />
//           ) : (
//             user.picture && (
//               <Image
//                 src={`/storage/${user.picture}`}
//                 alt="Current Profile"
//                 width={120}
//                 height={120}
//                 radius="xl"
//                 mb="sm"
//               />
//             )
//           )}

//           {/* Password Fields */}
//           <PasswordInput
//             label="New Password"
//             value={data.password}
//             onChange={(e) => setData("password", e.target.value)}
//             error={errors.password}
//           />
//           <PasswordInput
//             label="Confirm Password"
//             value={data.password_confirmation}
//             onChange={(e) => setData("password_confirmation", e.target.value)}
//             error={errors.password_confirmation}
//           />
//           <PasswordInput
//             label="Current Password"
//             value={data.current_password}
//             onChange={(e) => setData("current_password", e.target.value)}
//             error={errors.current_password}
//           />

//           <Group position="right" mt="md">
//             <Button type="submit" loading={processing}>
//               Save Changes
//             </Button>
//           </Group>
//         </Stack>
//       </form>
//     </Container>
//   );
// }

// export default ProfileEdit;
