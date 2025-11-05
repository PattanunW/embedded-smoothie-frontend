import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import { revalidateTag } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getProviders from "@/libs/getProviders";
import ProviderDeleteList from "@/components/ProviderDeleteList";
export default async function DeleteProviderPage(){
    const session = await getServerSession(authOptions);
    const providers = await getProviders();
    revalidateTag('providers')
    return (
        <main className="text-center p-5">
            {
                session?.user.User_info.role==='admin'? 
                <div>
                    <h1 className="text-xl font-medium font-robotoMono">Select the Provider You Want to Delete</h1>
                    <Suspense fallback={<p>Loading ... <LinearProgress/></p>}>
                        <ProviderDeleteList providerJson={providers}/>
                    </Suspense>
                </div>:<div className="text-center text-xl text-red-600 p-4 bg-slate-100 rounded-lg shadow-md max-w-md mx-auto font-robotoMono">You are not an administrator. Access denied.</div>
            }
        </main>
    );
}
