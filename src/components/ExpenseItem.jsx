import React, { useState, useEffect, useRef } from "react";
import {
  formatCurrency,
  getAllMatchingItems,
  formatDateToLocaleString,
  fetchData,
} from "../helpers";
import { Link, useFetcher } from "react-router-dom";
import { TrashIcon, PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/solid";

const ExpenseItem = ({ expense, showBudget }) => {
  const fetcher = useFetcher();
  const [isEditing, setIsEditing] = useState(false);
  const toggleFormRef = useRef();

  // Close edit mode when fetcher finishes (after submit)
  useEffect(() => {
    if (fetcher.state === "idle") {
      setIsEditing(false);
    }
  }, [fetcher.state]);

  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: expense.budgetId,
  })[0];

  const budgets = fetchData("budgets") ?? [];

  if (!isEditing) {
    return (
      <>
        <td>
          {/* small form to toggle checked status. uses fetcher.submit for non-navigation action */}
          <form
            ref={toggleFormRef}
            onChange={() => {
              // submit the form via fetcher to the current route action
              fetcher.submit(new FormData(toggleFormRef.current), { method: "post" });
            }}
          >
            <input type="hidden" name="_action" value="toggleExpense" />
            <input type="hidden" name="expenseId" value={expense.id} />
            <input
              type="checkbox"
              name="checked"
              defaultChecked={!!expense.checked}
              aria-label={`Mark ${expense.name} done`}
            />
          </form>
        </td>
        <td>{expense.name}</td>
        <td>{formatCurrency(expense.amount)}</td>
        <td>{formatDateToLocaleString(expense.createdAt)}</td>
        {showBudget && (
          <td>
            {budget ? (
              <Link to={`/budget/${budget.id}`} style={{ "--accent": budget.color }}>
                {budget.name}
              </Link>
            ) : (
              <span className="muted">Uncategorized</span>
            )}
          </td>
        )}
        <td className="action-buttons">
          <button
            type="button"
            className="btn"
            aria-label={`Edit ${expense.name}`}
            onClick={() => setIsEditing(true)}
          >
            <PencilSquareIcon width={18} />
          </button>
          <fetcher.Form method="post" style={{ display: "inline" }}>
            <input type="hidden" name="_action" value="deleteExpense" />
            <input type="hidden" name="expenseId" value={expense.id} />
            <button
              type="submit"
              className="btn btn--warning"
              aria-label={`Delete ${expense.name} expense`}
            >
              <TrashIcon width={20} />
            </button>
          </fetcher.Form>
        </td>
      </>
    );
  }

  // editing mode: keep valid table cells. Use an id for the form and reference it from inputs via the 'form' attribute.
  const formId = `edit-expense-${expense.id}`;

  // include toggle checkbox in editing mode as well
  const editToggleRef = useRef();
  return (
    <>
      <td>
        <form
          ref={editToggleRef}
          onChange={() =>
            fetcher.submit(new FormData(editToggleRef.current), { method: "post" })
          }
        >
          <input type="hidden" name="_action" value="toggleExpense" />
          <input type="hidden" name="expenseId" value={expense.id} />
          <input
            type="checkbox"
            name="checked"
            defaultChecked={!!expense.checked}
            aria-label={`Mark ${expense.name} done`}
          />
        </form>
      </td>
      <td>
        <input
          name="editedExpenseName"
          defaultValue={expense.name}
          required
          aria-label="Edited expense name"
          form={formId}
        />
      </td>
      <td>
        <input
          type="number"
          step="0.01"
          inputMode="decimal"
          name="editedExpenseAmount"
          defaultValue={expense.amount}
          required
          aria-label="Edited expense amount"
          form={formId}
        />
      </td>
      <td>{formatDateToLocaleString(expense.createdAt)}</td>
      {showBudget && (
        <td>
          <select
            name="editedExpenseBudget"
            defaultValue={expense.budgetId}
            form={formId}
          >
            {budgets.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </td>
      )}
      {/* ensure budgetId is always submitted so it doesn't get cleared when no selector is shown */}
      {!showBudget && (
        <input
          type="hidden"
          name="editedExpenseBudget"
          value={expense.budgetId}
          form={formId}
        />
      )}
      <td className="action-buttons">
        <fetcher.Form id={formId} method="post" style={{ display: "inline" }}>
          <input type="hidden" name="_action" value="editExpense" />
          <input type="hidden" name="expenseId" value={expense.id} />
          <button type="submit" className="btn">
            Save
          </button>
        </fetcher.Form>
        <button
          type="button"
          className="btn btn--warning"
          onClick={() => setIsEditing(false)}
          aria-label="Cancel edit"
          style={{ marginLeft: 8 }}
        >
          <XMarkIcon width={18} />
        </button>
      </td>
    </>
  );
};

export default ExpenseItem;
