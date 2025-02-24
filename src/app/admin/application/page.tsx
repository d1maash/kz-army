import Image from "next/image"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Ellipsis } from 'lucide-react';
import { testData } from "./testData";

const AdminApplication = () => {
  return (
    <div>
      <div className="flex justify-between gap-3">
        <form action="#" className="w-full">
              <input 
                type="text"
                placeholder="Поиск" 
                className="w-full p-3 pl-10 shadow-sm rounded-xl bg-[#F7F7F7]"
                style={{
                  backgroundImage: "url('/icons/search.svg')",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "10px center", 
                  backgroundSize: "20px 20px", 
              }}
            />
          </form>
          <button className="flex justify-center gap-3 items-center font-medium bg-custom-yellow rounded-xl p-3 px-6">
            Печать 
            <Image 
              src="/icons/download-file.svg"
              alt="download"
              width={16}
              height={16}
            />
          </button>
      </div>

      <div className="w-full mt-6 text-center bg-white rounded-xl border-2 border-[#C8C8C8]">
        <Table className="">
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow className="">
              <TableHead className="w-[100px] text-black text-center font-bold">ID заявки</TableHead>
              <TableHead className="text-black text-center font-bold">ФИО</TableHead>
              <TableHead className="text-black text-center font-bold">Дата подачи</TableHead>
              <TableHead className="text-black text-center font-bold">Тип заявки</TableHead>
              <TableHead className="text-black text-center font-bold">Статус</TableHead>
              <TableHead className="text-black text-center font-bold">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
              {testData.map((item) => (
                <>
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell className="text-[#033EFF] underline">{item.name}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>срочная служба</TableCell>
                    <TableCell>
                        <button 
                          className={`rounded-xl font-semibold p-1 px-3 ${item.status === "Одобрена" ?
                            "text-[#277C00] bg-[#E0FFD1]" : 
                            item.status === "В обработке" ?
                            "text-[#9F5000] bg-[#FFE7CE]" : 
                            "text-[#9F0000] bg-[#FFDCDC]"
                          }`}
                        >
                            {item.status}
                        </button>
                    </TableCell>
                    <TableCell className="text-right">
                      <Ellipsis className="mx-auto size-5" />
                    </TableCell>
                  </TableRow>
                </>
              ))}
              {/* <TableCell>34519472462</TableCell>
              <TableCell className="text-[#033EFF] underline">Иванов Иван Иванович</TableCell>
              <TableCell>12.02.2025</TableCell>
              <TableCell>срочная служба</TableCell>
              <TableCell>Одобрена</TableCell>
              <TableCell className="text-right">
                <Ellipsis className="mx-auto size-5" />
              </TableCell> */}
          </TableBody>
        </Table>

        <Pagination className="mt-5">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious className="border-[#E8E7DF] border-2" href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink className="border-custom-yellow border-2 text-custom-yellow" href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink className="border-[#E8E7DF] border-2" href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              
              <PaginationEllipsis className="border-[#E8E7DF] border-2 rounded-md"/>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink className="border-[#E8E7DF] border-2" href="#">9</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink className="border-[#E8E7DF] border-2" href="#">10</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext className="border-[#E8E7DF] border-2" href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

export default AdminApplication