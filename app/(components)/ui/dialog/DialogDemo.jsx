"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function DialogDemo({ product }) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Details</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-150">
          <DialogHeader>
            <DialogTitle className={"text-center"}>{product.name}</DialogTitle>
            <DialogDescription className={"text-center text-sm text-secondary"}>
              Here You can show more details about the product, like sizes and
              colors
            </DialogDescription>
          </DialogHeader>
          <Table>
            <TableCaption>A list of product sizes and colors.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Sizes</TableHead>
                <TableHead>Available Colors</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {product.sizes?.map((size) => {
                return (
                  <TableRow key={size.id}>
                    <TableCell>{size.sizeValue}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-3">
                        {size.colors && size.colors.length > 0 ? (
                          size.colors.map((color) => (
                            <div
                              key={color.id}
                              className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 px-2 py-1 rounded-md shadow-sm"
                            >
                              {/* لو عندك رابط صورة اللون، اعرضها مصغرة بشياكة */}
                              {color.colorImage ? (
                                <img
                                  src={color.colorImage}
                                  alt={color.colorName}
                                  className="w-5 h-5 rounded object-cover border border-slate-300"
                                />
                              ) : (
                                <div className="w-4 h-4 rounded bg-gray-300 flex items-center justify-center">
                                  <ImageIcon
                                    size={10}
                                    className="text-gray-500"
                                  />
                                </div>
                              )}
                              <span className="text-xs font-medium text-slate-800">
                                {color.colorName}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                ({color?.colorQuantity} in stock)
                              </span>
                            </div>
                          ))
                        ) : (
                          <span className="text-xs text-muted-foreground italic">
                            No colors available
                          </span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
