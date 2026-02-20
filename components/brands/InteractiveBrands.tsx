import Link from 'next/link'

const CURATED = 'CURATED BY CRAFTED'

interface RowItem {
  text: string
  accent?: boolean
  href?: string
}

const desktopRows: RowItem[][] = [
  [{ text: 'VADO' }, { text: 'LAKES' }, { text: 'RUBI' }, { text: 'SIGMA' }, { text: 'CROSSWATER' }, { text: 'DEKTON' }, { text: 'NUIE' }, { text: 'JTP', href: '/brands/jtp' }, { text: 'KARTELL' }, { text: 'CALYPSO' }],
  [{ text: 'ACQUABELLA' }, { text: 'SCUDO' }, { text: 'JTP', href: '/brands/jtp' }, { text: 'ROCA' }, { text: 'KERAKOLL' }, { text: 'CARRON' }, { text: 'CROSSWATER' }, { text: 'RAK' }, { text: 'BURLINGTON' }, { text: 'FLOVA' }],
  [{ text: 'JTP', href: '/brands/jtp' }, { text: 'CARRON' }, { text: 'BURLINGTON' }, { text: 'FLOVA' }, { text: 'BIHUI' }, { text: 'RUBI' }, { text: 'SIGMA' }, { text: 'TAVISTOCK' }, { text: 'LAKES' }, { text: 'DEKTON' }],
  [{ text: 'BURLINGTON' }, { text: 'ROCA' }, { text: 'CALYPSO' }, { text: 'NUIE' }, { text: CURATED, accent: true }, { text: 'SILESTONE' }, { text: 'JTP', href: '/brands/jtp' }, { text: 'VELDEAU' }, { text: 'FLOVA' }, { text: 'RAK' }],
  [{ text: 'ROCA' }, { text: 'GEBERIT' }, { text: 'SIGMA' }, { text: 'RAK' }, { text: 'DEKTON' }, { text: 'JTP', href: '/brands/jtp' }, { text: 'KARTELL' }, { text: 'SCUDO' }, { text: 'VADO' }, { text: 'TAVISTOCK' }],
  [{ text: 'SIGMA' }, { text: 'BC DESIGNS' }, { text: 'TAVISTOCK' }, { text: 'RUBI' }, { text: 'LAKES' }, { text: 'BIHUI' }, { text: 'JTP', href: '/brands/jtp' }, { text: 'ROCA' }, { text: 'ACQUABELLA' }, { text: 'GEBERIT' }],
  [{ text: 'GEBERIT' }, { text: 'VELDEAU' }, { text: 'SCUDO' }, { text: 'JTP', href: '/brands/jtp' }, { text: 'BC DESIGNS' }, { text: 'CARRON' }, { text: 'KERAKOLL' }, { text: 'FLOVA' }, { text: 'SILESTONE' }, { text: 'RAK' }],
]

const mobileRows: RowItem[][] = [
  [{ text: 'VADO' }, { text: 'LAKES' }, { text: 'RUBI' }, { text: 'SIGMA' }, { text: 'JTP', href: '/brands/jtp' }],
  [{ text: 'CROSSWATER' }, { text: 'DEKTON' }, { text: 'NUIE' }, { text: 'KARTELL' }, { text: 'RAK' }],
  [{ text: 'CALYPSO' }, { text: 'ACQUABELLA' }, { text: 'SCUDO' }, { text: 'JTP', href: '/brands/jtp' }, { text: 'ROCA' }],
  [{ text: 'CARRON' }, { text: 'BURLINGTON' }, { text: 'FLOVA' }, { text: 'BIHUI' }, { text: 'RUBI' }],
  [{ text: 'SIGMA' }, { text: 'TAVISTOCK' }, { text: 'LAKES' }, { text: 'GEBERIT' }, { text: 'JTP', href: '/brands/jtp' }],
  [{ text: 'DEKTON' }, { text: CURATED, accent: true }, { text: 'ROCA' }, { text: 'CALYPSO' }],
  [{ text: 'NUIE' }, { text: 'JTP', href: '/brands/jtp' }, { text: 'SILESTONE' }, { text: 'KERAKOLL' }, { text: 'FLOVA' }],
  [{ text: 'GEBERIT' }, { text: 'SIGMA' }, { text: 'RAK' }, { text: 'JTP', href: '/brands/jtp' }, { text: 'VADO' }],
  [{ text: 'KARTELL' }, { text: 'SCUDO' }, { text: 'BC DESIGNS' }, { text: 'CARRON' }, { text: 'TAVISTOCK' }],
  [{ text: 'VELDEAU' }, { text: 'ACQUABELLA' }, { text: 'SILESTONE' }, { text: 'RAK' }, { text: 'JTP', href: '/brands/jtp' }],
  [{ text: 'BURLINGTON' }, { text: 'RUBI' }, { text: 'LAKES' }, { text: 'BIHUI' }, { text: 'FLOVA' }],
  [{ text: 'ROCA' }, { text: 'CROSSWATER' }, { text: 'DEKTON' }, { text: 'JTP', href: '/brands/jtp' }, { text: 'SIGMA' }],
]

function BrandRow({ items, className }: { items: RowItem[]; className?: string }) {
  return (
    <div className={`flex items-center justify-between whitespace-nowrap ${className ?? ''}`}>
      {items.map((item, i) => {
        const classes = `font-rexton font-light transition-colors duration-300 select-none tracking-wide ${
          item.accent
            ? 'text-accent-500 hover:text-secondary cursor-default'
            : 'text-secondary hover:text-accent-500'
        } ${item.href ? 'cursor-pointer' : 'cursor-default'}`

        if (item.href) {
          return (
            <Link key={i} href={item.href} className={classes}>
              {item.text}
            </Link>
          )
        }

        return (
          <span key={i} className={classes}>
            {item.text}
          </span>
        )
      })}
    </div>
  )
}

export default function InteractiveBrands() {
  return (
    <section className="page-mx py-section-xs">
      <div className="mb-[60px] text-center">
        <h2 className="font-rexton font-bold text-[36px] text-primary-900">CRAFTED</h2>
        <p className="font-jost font-light text-[44px] text-primary-900">Home Of The Brands</p>
      </div>

      <div className="hidden md:flex bg-background overflow-hidden py-[16px] flex-col gap-[14px] px-[16px]">
        {desktopRows.map((items, i) => (
          <BrandRow key={i} items={items} className="text-base lg:text-xl" />
        ))}
      </div>

      <div className="flex md:hidden bg-background overflow-hidden py-[12px] flex-col gap-[10px] px-[12px]">
        {mobileRows.map((items, i) => (
          <BrandRow key={i} items={items} className="text-sm" />
        ))}
      </div>
    </section>
  )
}
