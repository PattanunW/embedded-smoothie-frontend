import getCars from "@/libs/getCars";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import { revalidateTag } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import CarUpdateList from "@/components/CarUpdateList";
export default async function UpdateCarPage(){
    const session = await getServerSession(authOptions);
    const cars = await getCars();
    revalidateTag('cars')
    return (
        <main className="text-center p-5">
            {
                session?.user.User_info.role==='admin'? 
                <div>
                    <h1 className="text-xl font-medium font-robotoMono text-black">Select the Car You Want to Update</h1>
                    <Suspense fallback={<p>Loading ... <LinearProgress/></p>}>
                        <CarUpdateList carJson={cars}/>
                    </Suspense>
                </div>:<div className="text-center text-xl text-red-600 p-4 bg-slate-100 rounded-lg shadow-md max-w-md mx-auto">You are not an administrator. Access denied.</div>
            }
        </main>
    );
}
