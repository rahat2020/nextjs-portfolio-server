/**
 * Reusable query builder for Mongoose queries.
 * Supports pagination, sorting, field selection, search, and filtering.
 */
class QueryBuilder {
  constructor(query, queryParams) {
    this.query = query;
    this.queryParams = queryParams;
    this.meta = {};
  }

  /** Text search on specified fields */
  search(searchableFields = []) {
    const searchTerm = this.queryParams.search;
    if (searchTerm && searchableFields.length) {
      this.query = this.query.find({
        $or: searchableFields.map((field) => ({
          [field]: { $regex: searchTerm, $options: "i" },
        })),
      });
    }
    return this;
  }

  /** Filter by exact-match fields (e.g., category, isPublished) */
  filter(filterableFields = []) {
    const filterObj = {};
    for (const field of filterableFields) {
      if (this.queryParams[field] !== undefined && this.queryParams[field] !== "") {
        // Handle boolean strings
        if (this.queryParams[field] === "true") filterObj[field] = true;
        else if (this.queryParams[field] === "false") filterObj[field] = false;
        else filterObj[field] = this.queryParams[field];
      }
    }

    // Handle tags filtering (comma-separated → $in)
    if (this.queryParams.tags) {
      filterObj.tags = { $in: this.queryParams.tags.split(",").map((t) => t.trim()) };
    }

    if (Object.keys(filterObj).length) {
      this.query = this.query.find(filterObj);
    }
    return this;
  }

  /** Sort results (default: newest first) */
  sort() {
    const sortBy = this.queryParams.sortBy || "-createdAt";
    this.query = this.query.sort(sortBy.split(",").join(" "));
    return this;
  }

  /** Select specific fields */
  fields() {
    if (this.queryParams.fields) {
      const fields = this.queryParams.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    }
    return this;
  }

  /** Paginate results */
  async paginate() {
    const page = Math.max(parseInt(this.queryParams.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(this.queryParams.limit, 10) || 10, 1), 100);
    const skip = (page - 1) * limit;

    // Count total documents matching the current filter
    const total = await this.query.model.countDocuments(this.query.getFilter());
    const totalPages = Math.ceil(total / limit);

    this.query = this.query.skip(skip).limit(limit);
    this.meta = { page, limit, total, totalPages };

    return this;
  }
}

export default QueryBuilder;
