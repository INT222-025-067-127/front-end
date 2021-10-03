import { Observer } from "mobx-react-lite";
import React, { useContext } from "react";
import MainLayout from "../../../core/components/main_layout";
import TextInput from "../component/text_input";
import { productContext } from "../context/product_context";

export default function ProductPage() {
  const context = useContext(productContext);

  return (
    <Observer>
      {() => (
        <MainLayout>
          <div>
            <div className="flex justify-between">
              <h1>Product</h1>
              <div>
                <TextInput placeholder="search" onChange={(e) => {context.setValue("search_word", e.target.value)}} />
              </div>
            </div>
          </div>
        </MainLayout>
      )}
    </Observer>
  );
}
