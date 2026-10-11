"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Check, Package } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/data/products";
import { peso } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
export function ProductCard({ product: p }: { product: Product }) {
  const [failed, setFailed] = useState(false);
  return (
    <Dialog>
      <article className="product-card">
        <DialogTrigger asChild>
          <button
            className="product-open"
            aria-label={`View details for ${p.name}`}
          >
            <div className="product-image">
              <span className="product-brand">{p.brand}</span>
              <Image
                src={failed ? "/images/fallback.svg" : p.image}
                alt={`Illustration of ${p.name}`}
                width={400}
                height={300}
                onError={() => setFailed(true)}
              />
              <span className="product-open-icon">
                <ArrowUpRight size={18} />
              </span>
            </div>
            <div className="product-info">
              <p className="eyebrow muted">{p.category}</p>
              <h3>{p.name}</h3>
              <div className="product-price">
                <strong>{peso(p.price)}</strong>
                <span
                  className={
                    p.availability === "Sample in stock" ? "stock" : "muted"
                  }
                >
                  <span className="status-dot" />
                  {p.availability.replace("Sample ", "")}
                </span>
              </div>
            </div>
          </button>
        </DialogTrigger>
      </article>
      <DialogContent>
        <div className="dialog-product-image">
          <Image
            src={failed ? "/images/fallback.svg" : p.image}
            alt={`Illustration of ${p.name}`}
            width={400}
            height={260}
          />
        </div>
        <p className="eyebrow">
          {p.brand} · {p.id}
        </p>
        <DialogTitle className="dialog-title">{p.name}</DialogTitle>
        <DialogDescription>{p.description}</DialogDescription>
        <div className="detail-price">
          <strong>{peso(p.price)}</strong>
          <span>
            <Package size={15} />
            {p.availability}
          </span>
        </div>
        <p className="fitment">
          <Check size={17} /> Confirm fitment with your vehicle’s make, model,
          and year.
        </p>
        <Link className="button full" href={`/contact?product=${p.id}`}>
          Inquire About This Part <ArrowUpRight size={18} />
        </Link>
        <p className="fine-print">
          Demonstration product, illustration, brand, price, and availability.
          No purchases or reservations are made.
        </p>
      </DialogContent>
    </Dialog>
  );
}
