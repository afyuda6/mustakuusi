import {useLoaderData} from "react-router-dom";
import {useState, useEffect, type ChangeEvent} from "react";
import Breadcrumb from "../components/Breadcrumb";
import SelectBox from "../components/SelectBox";

interface Province {
    id: number;
    name: string;
}

interface Regency {
    id: number;
    name: string;
    province_id: number;
}

interface District {
    id: number;
    name: string;
    regency_id: number;
}

interface RegionsData {
    provinces: Province[];
    regencies: Regency[];
    districts: District[];
}

interface RegionState {
    province?: string;
    regency?: string;
    district?: string;
}

interface BreadcrumbItem {
    label: string;
    to?: string;
}

export async function loader() {
    const res = await fetch("/data/indonesia_regions.json");
    const regions: RegionsData = await res.json();

    const saved: RegionState = JSON.parse(localStorage.getItem("regionState") || "{}");
    return {regions, saved};
}

function RegionDisplay({label, name}: { label: string; name: string }) {
    return (
        <div className="text-center">
            <p className="text-xs text-blue-400 tracking-widest mb-2 font-semibold">{label}</p>
            <h1 className="text-5xl font-extrabold text-gray-900">{name}</h1>
        </div>
    );
}

const Arrow = () => <div className="my-6 text-gray-300 text-2xl">↓</div>;

export default function RegionPage() {
    const {regions, saved} = useLoaderData() as {
        regions: RegionsData;
        saved: RegionState;
    };

    const [province, setProvince] = useState(saved.province || String(regions.provinces[0]?.id ?? ""));
    const [regency, setRegency] = useState(saved.regency || "");
    const [district, setDistrict] = useState(saved.district || "");

    const regencyList = regions.regencies.filter(
        (r: Regency) => r.province_id === Number(province)
    );
    const districtList = regions.districts.filter(
        (d: District) => d.regency_id === Number(regency)
    );

    const provinceName = regions.provinces.find((p) => p.id === Number(province))?.name;
    const regencyName = regencyList.find((r) => r.id === Number(regency))?.name;
    const districtName = districtList.find((d) => d.id === Number(district))?.name;

    useEffect(() => {
        localStorage.setItem("regionState", JSON.stringify({province, regency, district}));
    }, [province, regency, district]);

    const handleReset = () => {
        setProvince("");
        setRegency("");
        setDistrict("");
        localStorage.removeItem("regionState");
    };

    const breadcrumbItems: BreadcrumbItem[] = [{label: "Indonesia", to: "/"}];
    if (provinceName) breadcrumbItems.push({label: provinceName});
    if (regencyName) breadcrumbItems.push({label: regencyName});
    if (districtName) breadcrumbItems.push({label: districtName});

    return (
        <div className="flex w-full h-screen bg-gray-50">
            <aside className="w-72 bg-white px-8 py-10 border-r border-gray-100 flex flex-col shadow-sm">
                <div className="flex items-center gap-3 mb-10">
                    <div className="bg-blue-50 p-2.5 rounded-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-blue-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M12 2a10 10 0 100 20 10 10 0 000-20z"/>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20M12 2a15 15 0 010 20"/>
                        </svg>
                    </div>
                    <h1 className="font-bold text-gray-800 text-base">Frontend Assessment</h1>
                </div>

                <h2 className="text-xs font-semibold text-gray-400 tracking-widest mb-6">
                    FILTER WILAYAH
                </h2>

                <SelectBox
                    label="PROVINSI"
                    name="province"
                    value={province}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        setProvince(e.target.value);
                        setRegency("");
                        setDistrict("");
                    }}
                    options={regions.provinces}
                />

                <SelectBox
                    label="KOTA/KABUPATEN"
                    name="regency"
                    value={regency}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        setRegency(e.target.value);
                        setDistrict("");
                    }}
                    options={regencyList}
                />

                <SelectBox
                    label="KECAMATAN"
                    name="district"
                    value={district}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setDistrict(e.target.value)}
                    options={districtList}
                />

                <button
                    onClick={handleReset}
                    className="mt-auto w-full border-2 border-blue-500 text-blue-600 rounded-2xl py-3.5 font-bold text-sm tracking-widest hover:bg-blue-50 active:bg-blue-100 transition-all duration-150 flex items-center justify-center gap-2"
                >
                    <span className="text-base leading-none">✕</span>
                    <span>RESET</span>
                </button>
            </aside>

            <main className="flex-1 bg-gray-50 flex flex-col">
                <div className="pt-6 pb-4 px-16 border-b border-gray-200">
                    <Breadcrumb items={breadcrumbItems}/>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center px-16 -mt-8">
                    {provinceName && (
                        <>
                            <RegionDisplay label="PROVINSI" name={provinceName}/>
                            {regencyName && (
                                <>
                                    <Arrow/>
                                    <RegionDisplay label="KOTA / KABUPATEN" name={regencyName}/>
                                    {districtName && (
                                        <>
                                            <Arrow/>
                                            <RegionDisplay label="KECAMATAN" name={districtName}/>
                                        </>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}