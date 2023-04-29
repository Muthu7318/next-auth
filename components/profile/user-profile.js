import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";

// import { useSession } from "next-auth/react";

function UserProfile() {
  // Redirect away if NOT auth
  // const { data: session, status } = useSession();

  // if (status === "loading") {
  //   return <p className={classes.profile}>Loading...</p>;
  // }

  // if (!session) {
  //   window.location.href = "/auth";
  //   return;
  // }

  // if (status === "authenticated") {
  //   return (
  //     <section className={classes.profile}>
  //       <h1>Your User Profile</h1>
  //       <ProfileForm />
  //     </section>
  //   );
  // }

  const changePasswordHandler = async (passwordData) => {
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
    }

    const result = await response.json();
    console.log(result);
  };
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;
