import React, { type ReactNode } from "react";
import i18n from "../../i18n";
import { AppInitializerProvider } from "../../context/initializer-context";
import { useBreakPoint } from "../../hooks/useBreakPoint";
import { cn } from "../../helpers/function-helper";

interface ICardComponent {
  data: ILabelValue[];
  gridClassName?: string;
  mainTitle?: string;
  withHeaders?: boolean;
  withBorder?: boolean;
  withColumnBorders?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  valueClassName?: string;
  isArabic: boolean;
}

export interface ILabelValue {
  label: string;
  value: string | ReactNode;
  labelClassName?: string;
  valueClassName?: string;
  currency?: string | undefined;
  colSpan?: number;
  rowSpan?: number;
  noBorder?: boolean;
}

export const LabelValue: React.FC<ILabelValue> = ({ 
  label, 
  value, 
  labelClassName, 
  valueClassName, 
  currency,
  colSpan = 1,
  rowSpan = 1,
  noBorder
}) => {
  const isReactNode = React.isValidElement(value);
  
  return (
    <div 
      className={`flex items-start gap-4 flex-col justify-start h-full`}
      style={{ 
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`
      }}
    >
      <div className={cn("font-bold text-sm", labelClassName)}>
        {label}
      </div>
      <div className={cn("text-base text-aegold-900", valueClassName)}>
        {isReactNode ? value : `${value || i18n.t("NotFound")} ${currency || ""}`}
      </div>
    </div>
  );
};

export const CardComponent: React.FC<ICardComponent> = ({
  data,
  gridClassName = "",
  mainTitle,
  withHeaders = false,
  withBorder = false,
  containerClassName,
  labelClassName,
  valueClassName = "w-full",
  isArabic,
}) => {
  const { getCurrentColumns } = useBreakPoint();
  const currentColumns = getCurrentColumns(gridClassName);

  const renderHeader = () => {
    if (!withHeaders || !mainTitle) return null;
    return (
      <div className="p-4 border-b border-aeblack-200">
        <h2 className="text-xl font-bold">{mainTitle}</h2>
      </div>
    );
  };

  const isInLastRow = (index: number): boolean => {
    let currentRow = 1;
    let currentColInRow = 0;
    let itemRow = 1;
    
    // Calculate which row this item is in
    for (let i = 0; i <= index; i++) {
      const itemColSpan = data[i].colSpan || 1;
      
      if (currentColInRow + itemColSpan > currentColumns) {
        currentRow++;
        currentColInRow = itemColSpan;
      } else {
        currentColInRow += itemColSpan;
      }
      
      if (i === index) {
        itemRow = currentRow;
      }
    }
    
    let totalRows = 1;
    currentColInRow = 0;
    
    for (let i = 0; i < data.length; i++) {
      const itemColSpan = data[i].colSpan || 1;
      
      if (currentColInRow + itemColSpan > currentColumns) {
        totalRows++;
        currentColInRow = itemColSpan;
      } else {
        currentColInRow += itemColSpan;
      }
    }
    
    return itemRow === totalRows;
  };

  const renderGridItems = () => {
    return (
      <>
        {data.map((item, index) => {
          const inLastRow = isInLastRow(index);
          const shouldShowBorder = withBorder && !inLastRow && !item.noBorder;
          
          return (
            <div
              key={index}
              className={`
                relative p-4
                ${shouldShowBorder ? 'border-b border-aeblack-100' : ''}
              `}
            >
              <LabelValue
                {...item}
                labelClassName={item.labelClassName || labelClassName}
                valueClassName={item.valueClassName || valueClassName}
              />
            </div>
          );
        })}
      </>
    );
  };

  return (
    <AppInitializerProvider containerId="card-component" preferredLanguage={isArabic ? "ar" : "en"}>
      <div className={cn("rounded-lg overflow-hidden", containerClassName || "shadow-card")}>
        {renderHeader()}
        <div className={cn("grid", gridClassName || "grid-cols-1 md:grid-cols-2 lg:grid-cols-3")}>
          {renderGridItems()}
        </div>
      </div>
    </AppInitializerProvider>
  );
};



